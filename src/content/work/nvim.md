---
title: Neovim Configuration
publishDate: 2023-01-01 00:00:00
img: /assets/stock-1.jpg
img_alt: My personal nvim configuration
description: |
  My personal nvim configuration
tags:
  - Dev Tools
  - Developer Experience
---

My personal nvim configuration.

### Neovim Configuration

A comprehensive Neovim configuration with lazy.nvim plugin manager, featuring LSP support, code completion, formatting, linting, and various productivity plugins.

#### Features

- **LSP Support**: Lua, Python, TypeScript/JavaScript, and Go with mason.nvim
- **Code Completion**: nvim-cmp with LSP and snippet integration
- **Formatting**: conform.nvim for code formatting
- **Linting**: nvim-lint for code quality checks
- **Syntax Highlighting**: Treesitter for advanced syntax parsing
- **UI Enhancements**: Bufferline, lualine statusline, themery theme switcher
- **Productivity**: Flash motion, which-key keybinding helper, undo tree
- **Git Integration**: Gitsigns, fugitive, diffview
- **AI Assistance**: GitHub Copilot integration

#### Installation

1. Clone this repository to your Neovim config directory:

   ```bash
   git clone <repository-url> ~/.config/nvim
   ```

2. Launch Neovim to install plugins automatically via lazy.nvim

3. Run `:MasonInstall` to install LSP servers as needed

#### Keybindings

- Leader key: `<Space>`
- File explorer: `<Space>e` (Oil)
- Git status: `<Space>gs` (Fugitive)
- Search and replace: `<Space>sr` (Grug-far)
- Keybindings help: `<Space>?` (Which-key)

[See More](https://github.com/matthewalunni/nvim)
