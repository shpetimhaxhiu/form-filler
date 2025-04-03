/**
 * Jest Setup
 * 
 * This file runs before each test file and can be used to set up global test utilities.
 * 
 * Created by Shpetim Haxhiu (https://pito.dev)
 */

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

// Mock alert, confirm, and prompt
global.alert = jest.fn();
global.confirm = jest.fn();
global.prompt = jest.fn(); 