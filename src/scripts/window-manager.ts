// Window Manager for Windows XP Theme

interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  savedPosition?: { x: number; y: number };
  savedSize?: { width: number; height: number };
}

class WindowManager {
  private windows: Map<string, WindowState> = new Map();
  private topZIndex = 100;
  private dragState: {
    isDragging: boolean;
    windowId: string | null;
    startX: number;
    startY: number;
    startPosX: number;
    startPosY: number;
  } = {
    isDragging: false,
    windowId: null,
    startX: 0,
    startY: 0,
    startPosX: 0,
    startPosY: 0,
  };

  private resizeState: {
    isResizing: boolean;
    windowId: string | null;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } = {
    isResizing: false,
    windowId: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
  };

  constructor() {
    this.initEventListeners();
  }

  private initEventListeners(): void {
    // Window open event
    window.addEventListener('xp:window:open', ((e: CustomEvent) => {
      this.openWindow(e.detail.windowId);
    }) as EventListener);

    // Taskbar button click
    window.addEventListener('xp:taskbar:click', ((e: CustomEvent) => {
      this.handleTaskbarClick(e.detail.windowId);
    }) as EventListener);

    // Mouse move for dragging
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));

    // Touch support
    document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    document.addEventListener('touchend', this.handleMouseUp.bind(this));

    // Initialize windows from DOM
    this.initWindowsFromDOM();
  }

  private initWindowsFromDOM(): void {
    const windowElements = document.querySelectorAll('[data-window-id]');
    const processedIds = new Set<string>();

    windowElements.forEach((el) => {
      const windowId = (el as HTMLElement).dataset.windowId;
      if (!windowId || processedIds.has(windowId)) return;

      // Only process actual window containers (not title bars)
      if (!el.classList.contains('xp-window')) return;

      processedIds.add(windowId);

      const title = (el as HTMLElement).dataset.windowTitle || windowId;
      const icon = (el as HTMLElement).dataset.windowIcon || '';
      const rect = el.getBoundingClientRect();
      const isOpen = !el.classList.contains('xp-window--hidden');

      this.windows.set(windowId, {
        id: windowId,
        title,
        icon,
        isOpen,
        isMinimized: false,
        isMaximized: false,
        isFocused: false,
        zIndex: 100,
        position: { x: parseInt((el as HTMLElement).style.left) || 100, y: parseInt((el as HTMLElement).style.top) || 50 },
        size: { width: rect.width || 600, height: rect.height || 400 },
      });

      // Attach window event handlers
      this.attachWindowEvents(el as HTMLElement, windowId);
    });

    this.broadcastUpdate();
  }

  private attachWindowEvents(el: HTMLElement, windowId: string): void {
    // Focus on click
    el.addEventListener('mousedown', () => {
      this.focusWindow(windowId);
    });

    // Title bar events
    const titleBar = el.querySelector('.xp-window__titlebar');
    if (titleBar) {
      titleBar.addEventListener('mousedown', (e: Event) => {
        const target = (e as MouseEvent).target as HTMLElement;
        if (target.closest('.xp-window__controls')) return;

        const state = this.windows.get(windowId);
        if (state?.isMaximized) return;

        this.startDrag(windowId, e as MouseEvent);
      });

      titleBar.addEventListener('touchstart', (e: Event) => {
        const target = (e as TouchEvent).target as HTMLElement;
        if (target.closest('.xp-window__controls')) return;

        const state = this.windows.get(windowId);
        if (state?.isMaximized) return;

        const touch = (e as TouchEvent).touches[0];
        this.startDrag(windowId, { clientX: touch.clientX, clientY: touch.clientY } as MouseEvent);
      }, { passive: true });

      // Double click to maximize
      titleBar.addEventListener('dblclick', (e: Event) => {
        const target = (e as MouseEvent).target as HTMLElement;
        if (target.closest('.xp-window__controls')) return;
        this.toggleMaximize(windowId);
      });
    }

    // Control buttons
    const controls = el.querySelectorAll('.xp-window__control-btn');
    controls.forEach((btn) => {
      btn.addEventListener('click', (e: Event) => {
        e.stopPropagation();
        const action = (btn as HTMLElement).dataset.action;
        if (action === 'minimize') this.minimizeWindow(windowId);
        if (action === 'maximize') this.toggleMaximize(windowId);
        if (action === 'close') this.closeWindow(windowId);
      });
    });

    // Resize handle
    const resizeHandle = el.querySelector('.xp-window__resize');
    if (resizeHandle) {
      resizeHandle.addEventListener('mousedown', (e: Event) => {
        e.stopPropagation();
        this.startResize(windowId, e as MouseEvent);
      });

      resizeHandle.addEventListener('touchstart', (e: Event) => {
        e.stopPropagation();
        const touch = (e as TouchEvent).touches[0];
        this.startResize(windowId, {
          clientX: touch.clientX,
          clientY: touch.clientY,
          preventDefault: () => {}
        } as MouseEvent);
      }, { passive: true });
    }
  }

  private startDrag(windowId: string, e: MouseEvent): void {
    const state = this.windows.get(windowId);
    if (!state) return;

    this.dragState = {
      isDragging: true,
      windowId,
      startX: e.clientX,
      startY: e.clientY,
      startPosX: state.position.x,
      startPosY: state.position.y,
    };

    const el = document.getElementById(`window-${windowId}`);
    el?.classList.add('xp-window--dragging');
  }

  private startResize(windowId: string, e: MouseEvent): void {
    e.preventDefault();
    const state = this.windows.get(windowId);
    if (!state || state.isMaximized) return;

    this.resizeState = {
      isResizing: true,
      windowId,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: state.size.width,
      startHeight: state.size.height,
    };

    const el = document.getElementById(`window-${windowId}`);
    el?.classList.add('xp-window--resizing');
  }

  private handleMouseMove(e: MouseEvent): void {
    if (this.dragState.isDragging && this.dragState.windowId) {
      const deltaX = e.clientX - this.dragState.startX;
      const deltaY = e.clientY - this.dragState.startY;

      const newX = Math.max(0, this.dragState.startPosX + deltaX);
      const newY = Math.max(0, this.dragState.startPosY + deltaY);

      this.updateWindowPosition(this.dragState.windowId, newX, newY);
    }

    if (this.resizeState.isResizing && this.resizeState.windowId) {
      const deltaX = e.clientX - this.resizeState.startX;
      const deltaY = e.clientY - this.resizeState.startY;

      const newWidth = Math.max(200, this.resizeState.startWidth + deltaX);
      const newHeight = Math.max(150, this.resizeState.startHeight + deltaY);

      this.updateWindowSize(this.resizeState.windowId, newWidth, newHeight);
    }
  }

  private handleTouchMove(e: TouchEvent): void {
    if (this.dragState.isDragging || this.resizeState.isResizing) {
      e.preventDefault();
      const touch = e.touches[0];
      this.handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY } as MouseEvent);
    }
  }

  private handleMouseUp(): void {
    if (this.dragState.isDragging && this.dragState.windowId) {
      const el = document.getElementById(`window-${this.dragState.windowId}`);
      el?.classList.remove('xp-window--dragging');
    }

    if (this.resizeState.isResizing && this.resizeState.windowId) {
      const el = document.getElementById(`window-${this.resizeState.windowId}`);
      el?.classList.remove('xp-window--resizing');
    }

    this.dragState = { isDragging: false, windowId: null, startX: 0, startY: 0, startPosX: 0, startPosY: 0 };
    this.resizeState = { isResizing: false, windowId: null, startX: 0, startY: 0, startWidth: 0, startHeight: 0 };
  }

  private updateWindowPosition(windowId: string, x: number, y: number): void {
    const state = this.windows.get(windowId);
    if (!state) return;

    state.position = { x, y };
    const el = document.getElementById(`window-${windowId}`);
    if (el) {
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    }
  }

  private updateWindowSize(windowId: string, width: number, height: number): void {
    const state = this.windows.get(windowId);
    if (!state) return;

    state.size = { width, height };
    const el = document.getElementById(`window-${windowId}`);
    if (el) {
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
    }
  }

  openWindow(windowId: string): void {
    const state = this.windows.get(windowId);
    if (!state) return;

    state.isOpen = true;
    state.isMinimized = false;
    this.focusWindow(windowId);

    const el = document.getElementById(`window-${windowId}`);
    if (el) {
      el.classList.remove('xp-window--hidden', 'xp-window--minimized');
    }

    window.dispatchEvent(new CustomEvent('xp:sound:play', { detail: { sound: 'open' } }));
    this.broadcastUpdate();
  }

  closeWindow(windowId: string): void {
    const state = this.windows.get(windowId);
    if (!state) return;

    state.isOpen = false;
    state.isMinimized = false;
    state.isMaximized = false;
    state.isFocused = false;

    const el = document.getElementById(`window-${windowId}`);
    if (el) {
      el.classList.add('xp-window--hidden');
      el.classList.remove('xp-window--maximized', 'xp-window--focused');
    }

    window.dispatchEvent(new CustomEvent('xp:sound:play', { detail: { sound: 'close' } }));
    this.broadcastUpdate();
  }

  minimizeWindow(windowId: string): void {
    const state = this.windows.get(windowId);
    if (!state) return;

    state.isMinimized = true;
    state.isFocused = false;

    const el = document.getElementById(`window-${windowId}`);
    if (el) {
      el.classList.add('xp-window--minimized');
      el.classList.remove('xp-window--focused');
    }

    this.broadcastUpdate();
  }

  toggleMaximize(windowId: string): void {
    const state = this.windows.get(windowId);
    if (!state) return;

    const el = document.getElementById(`window-${windowId}`);
    if (!el) return;

    if (state.isMaximized) {
      // Restore
      state.isMaximized = false;
      el.classList.remove('xp-window--maximized');

      if (state.savedPosition && state.savedSize) {
        state.position = state.savedPosition;
        state.size = state.savedSize;
        el.style.left = `${state.position.x}px`;
        el.style.top = `${state.position.y}px`;
        el.style.width = `${state.size.width}px`;
        el.style.height = `${state.size.height}px`;
      }
    } else {
      // Maximize
      state.savedPosition = { ...state.position };
      state.savedSize = { ...state.size };
      state.isMaximized = true;
      el.classList.add('xp-window--maximized');
    }

    this.broadcastUpdate();
  }

  focusWindow(windowId: string): void {
    // Remove focus from all windows
    this.windows.forEach((state, id) => {
      state.isFocused = false;
      const el = document.getElementById(`window-${id}`);
      el?.classList.remove('xp-window--focused');
      el?.classList.add('xp-window--inactive');
    });

    // Focus the target window
    const state = this.windows.get(windowId);
    if (!state) return;

    this.topZIndex++;
    state.isFocused = true;
    state.zIndex = this.topZIndex;

    const el = document.getElementById(`window-${windowId}`);
    if (el) {
      el.classList.add('xp-window--focused');
      el.classList.remove('xp-window--inactive');
      el.style.zIndex = String(this.topZIndex);
    }

    this.broadcastUpdate();
  }

  handleTaskbarClick(windowId: string): void {
    const state = this.windows.get(windowId);
    if (!state) return;

    if (state.isMinimized) {
      // Restore from minimized
      state.isMinimized = false;
      const el = document.getElementById(`window-${windowId}`);
      el?.classList.remove('xp-window--minimized');
      this.focusWindow(windowId);
    } else if (state.isFocused) {
      // Minimize if already focused
      this.minimizeWindow(windowId);
    } else {
      // Focus the window
      this.focusWindow(windowId);
    }
  }

  private broadcastUpdate(): void {
    const windowsArray = Array.from(this.windows.values());
    window.dispatchEvent(new CustomEvent('xp:windows:update', {
      detail: { windows: windowsArray }
    }));
  }
}

// Initialize window manager when DOM is ready
function initWindowManager() {
  (window as any).xpWindowManager = new WindowManager();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWindowManager);
} else {
  initWindowManager();
}

export { WindowManager, WindowState };
