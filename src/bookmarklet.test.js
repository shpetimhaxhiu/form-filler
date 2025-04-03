/**
 * Bookmarklet Tests
 * 
 * Created by Shpetim Haxhiu (https://pito.dev)
 */

import bookmarklet from './bookmarklet';

// Mock functions
jest.mock('./css/style.css', () => ({}));

describe('Form Filler Bookmarklet', () => {
  let originalConsoleError;
  
  beforeEach(() => {
    // Mock document methods
    document.createElement = jest.fn().mockImplementation(() => ({
      style: {},
      id: '',
      className: '',
      appendChild: jest.fn(),
      remove: jest.fn(),
    }));
    
    document.getElementById = jest.fn().mockImplementation(() => ({
      remove: jest.fn(),
    }));
    
    document.body.appendChild = jest.fn();
    document.addEventListener = jest.fn();
    document.removeEventListener = jest.fn();
    
    // Mock window.alert
    global.alert = jest.fn();
    
    // Spy on console.error but prevent actual console output in tests
    originalConsoleError = console.error;
    console.error = jest.fn();
  });
  
  afterEach(() => {
    // Restore console.error
    console.error = originalConsoleError;
    
    // Clear all mocks
    jest.clearAllMocks();
  });
  
  test('bookmarklet is a function', () => {
    expect(typeof bookmarklet).toBe('function');
  });
  
  // Add more tests as needed
}); 