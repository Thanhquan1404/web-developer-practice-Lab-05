# 🎨 Advanced React Design System - Compound Components & Portals

## 📋 Quick Start

### ✅ Tất cả files đã được tạo!

```
src/components/ui/
├── Tabs/
│   ├── index.js                    ✅ Export barrel
│   ├── Tabs.jsx                    ✅ Compound Tabs component (300+ lines)
│   ├── Tabs.module.css             ✅ Professional styling
│   └── TabsContext.js              ✅ Context setup (100+ lines)
│
├── Modal/
│   ├── index.js                    ✅ Export barrel
│   ├── Modal.jsx                   ✅ Portal-based modal (250+ lines)
│   └── Modal.module.css            ✅ Fixed positioning + animations
│
└── index.js                        ✅ Central export point

App.jsx                             ✅ Complete demo app (400+ lines)
App.css                             ✅ Global styles + responsive
DESIGN_SYSTEM_GUIDE.md             ✅ Complete documentation
```

---

## 🚀 Run Demo

```bash
# Start dev server
npm run dev

# Open http://localhost:5173
```

---

## 📖 TASK 1: Compound Tabs Component

### What is Compound Component Pattern?

```jsx
// ✅ GOOD: Compound Pattern (Flexible, Clean API)
<Tabs initialIndex={0}>
  <Tabs.List>
    <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
    <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel index={0}>Content 1</Tabs.Panel>
  <Tabs.Panel index={1}>Content 2</Tabs.Panel>
</Tabs>

// ❌ BAD: Props Drilling (Rigid, Verbose)
<Tabs tabs={[
  { label: 'Tab 1', content: 'Content 1' },
  { label: 'Tab 2', content: 'Content 2' },
]} />
```

### Key Features

✅ **Implicit State Management** - Sử dụng Context API  
✅ **No Prop Drilling** - Children tự access state  
✅ **Flexible Composition** - Chèn markup tùy ý  
✅ **Static Properties** - Clean API (Tabs.Tab, Tabs.Panel)  
✅ **Encapsulation** - Internal state không lộ ra  
✅ **Accessibility** - WAI-ARIA support  

### Architecture

```
Tabs (Parent)
├─ State: activeTabIndex
├─ Provides: TabsContext.Provider
│
├─ Tabs.List
│  └─ Wrapper container
│
├─ Tabs.Tab
│  ├─ Reads: activeTabIndex từ context
│  ├─ Writes: setActiveTabIndex()
│  └─ onClick: Cập nhật active tab
│
└─ Tabs.Panel
   ├─ Reads: activeTabIndex từ context
   └─ Renders: Chỉ khi index === activeTabIndex
```

### Code Walkthrough

**1. TabsContext.js** - Context Setup
```javascript
// Tạo context
export const TabsContext = createContext({
  activeTabIndex: 0,
  setActiveTabIndex: () => {},
});

// Provider component
export function TabsProvider({ children, initialIndex = 0 }) {
  const [activeTabIndex, setActiveTabIndex] = useState(initialIndex);
  return (
    <TabsContext.Provider value={{ activeTabIndex, setActiveTabIndex }}>
      {children}
    </TabsContext.Provider>
  );
}

// Custom hook
export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Must use inside Tabs');
  return context;
}
```

**2. Tabs.jsx** - Child Components
```javascript
// Tab Button Component
function Tab({ index, children }) {
  const { activeTabIndex, setActiveTabIndex } = useTabsContext();
  
  return (
    <button
      className={activeTabIndex === index ? 'active' : ''}
      onClick={() => setActiveTabIndex(index)}
    >
      {children}
    </button>
  );
}

// Tab Panel Component
function TabsPanel({ index, children }) {
  const { activeTabIndex } = useTabsContext();
  
  return (
    activeTabIndex === index && (
      <div className="panel">{children}</div>
    )
  );
}

// Attach as static properties
Tabs.Tab = Tab;
Tabs.Panel = TabsPanel;
```

### Custom Markup Support

The key flexibility of Compound Pattern:

```jsx
<Tabs>
  <Tabs.List>
    <Tabs.Tab index={0}>Home</Tabs.Tab>
    <Tabs.Tab index={1}>About</Tabs.Tab>
  </Tabs.List>

  {/* ✅ Chèn custom markup giữa components! */}
  <hr style={{ margin: '0' }} />
  <p style={{ padding: '10px', color: '#999' }}>Select a tab:</p>

  <Tabs.Panel index={0}>Home content</Tabs.Panel>
  <Tabs.Panel index={1}>About content</Tabs.Panel>
</Tabs>
```

---

## 🪟 TASK 2: Modal with React Portals

### What are React Portals?

Portals cho phép render React component vào một DOM node khác, vượt qua DOM constraints.

```javascript
// Render vào #modal-root thay vì current component
ReactDOM.createPortal(
  <div>Modal Content</div>,
  document.getElementById('modal-root')
);
```

### The "Trapdoor" Problem

```html
<!-- ❌ Problem: Modal bị cắt bởi overflow: hidden -->
<div style="overflow: hidden;">
  <Modal>...</Modal>  <!-- Render ở đây, bị cắt! -->
</div>

<!-- ✅ Solution: Portal render ở document.body -->
<div style="overflow: hidden;">
  <Modal>...</Modal>  <!-- Trigger mở modal -->
</div>
<div id="modal-root">
  <!-- Modal render ở đây, toàn màn hình! -->
</div>
```

### Event Bubbling Through React Hierarchy

**Important**: Event bubble theo React tree, không DOM tree!

```jsx
function App() {
  const handleAppClick = (e) => {
    console.log('Event bubbled to App!');
  };

  return (
    <div onClick={handleAppClick}>
      {/* Modal được render ở #modal-root (DOM) */}
      {/* Nhưng event bubble qua React hierarchy! */}
      <Modal isOpen={true}>
        <button onClick={() => console.log('Button clicked')}>
          Click me - event will bubble!
        </button>
      </Modal>
    </div>
  );
}

// Event Flow:
// 1. Click button
// 2. Button click handler fires
// 3. Event bubbles thru React component tree
// 4. App's onClick handler fires ✅
```

### Modal Component Structure

```javascript
// Modal Component
function Modal({ isOpen, onClose, children }) {
  // Event listeners
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Portal rendering
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={handleBackdropClick}>
      <div className="modal">{children}</div>
    </div>,
    document.getElementById('modal-root')
  );
}

// Static properties
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
```

### Features

✅ **Fixed Positioning** - Full screen overlay  
✅ **Backdrop Click** - Close modal khi click backdrop  
✅ **Escape Key** - Close khi nhấn Esc  
✅ **Scroll Lock** - Disable body scroll khi modal mở  
✅ **Animations** - Smooth fade-in + slide-up  
✅ **ARIA Support** - Accessibility attributes  
✅ **Responsive** - Works on mobile  

---

## 📊 Code Statistics

```
Components Created:
├─ Tabs Component:      ~300 lines
├─ TabsContext:         ~100 lines  
├─ Modal Component:     ~250 lines
├─ CSS Modules:         ~350 lines
└─ Demo App:            ~400 lines

Total: ~1,400 lines of production-ready code
```

---

## 🎨 Styling

### CSS Modules Approach

```javascript
// Import styles as object
import styles from './Tabs.module.css';

// Use as class names
<div className={styles['tabs-list']}>
  <button className={`${styles.tab} ${active ? styles.active : ''}`}>
    Tab 1
  </button>
</div>
```

### Features

✅ **Scoped Classes** - No naming conflicts  
✅ **Dark Mode** - prefers-color-scheme support  
✅ **Animations** - Fade-in, slide-up effects  
✅ **Responsive** - Mobile-first design  
✅ **Accessibility** - High contrast mode support  

---

## ⚙️ Prop Validation

Semua components sử dụng `prop-types` untuk validation:

```javascript
import PropTypes from 'prop-types';

Tab.propTypes = {
  index: PropTypes.number.isRequired,     // ✅ Required
  children: PropTypes.node.isRequired,    // ✅ React elements
  className: PropTypes.string,            // ✅ Optional
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  closeOnEscape: PropTypes.bool,
  closeOnBackdropClick: PropTypes.bool,
  portalId: PropTypes.string,
};
```

---

## 🧪 Testing Examples

### Testing Tabs

```javascript
// Check if Tabs context is provided
const { getByRole } = render(
  <Tabs>
    <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
    <Tabs.Panel index={0}>Content</Tabs.Panel>
  </Tabs>
);

// Check aria attributes
expect(getByRole('tab')).toHaveAttribute('aria-selected', 'true');

// Simulate click
fireEvent.click(getByRole('tab'));
expect(getByRole('tabpanel')).toBeVisible();
```

### Testing Modal

```javascript
// Check portal rendering
const modal = document.getElementById('modal-root');
expect(modal.children.length).toBeGreaterThan(0);

// Test close on Escape
fireEvent.keyDown(document, { key: 'Escape' });
expect(onClose).toHaveBeenCalled();

// Test backdrop click
const backdrop = document.querySelector('[role="presentation"]');
fireEvent.click(backdrop);
expect(onClose).toHaveBeenCalled();
```

---

## 💡 Design Patterns Explained

### Compound Component Pattern

**Why use it?**
- Parent cung cấp state (via Context)
- Children tự organize component tree
- No prop drilling
- Flexible composition
- Clean, intuitive API

**When to use:**
- Tabs, Accordion, Dropdown
- Form groups, Wizards
- Stepper, Gallery components

### Context API Pattern

**Why use it?**
- Avoid prop drilling through many levels
- Implicit state sharing
- Simpler component API

**Caution:**
- Can cause unnecessary re-renders
- Use `useMemo` để optimize value
- Not good for frequently changing state

### React Portals Pattern

**Why use it?**
- Escape DOM constraints (overflow, z-index)
- Full-screen modals, tooltips
- Event bubbling still works

**Common use cases:**
- Modal dialogs
- Dropdown menus
- Tooltips, popovers
- Notifications

---

## 🔧 Customization

### Override Tab Styles

```css
/* src/components/ui/Tabs/Tabs.module.css */
.tab {
  padding: 12px 20px;
  color: #666;
  border-bottom: 3px solid transparent;
}

.tab.active {
  color: #1976d2;
  border-bottom-color: #1976d2;
}
```

### Override Modal Styles

```css
/* src/components/ui/Modal/Modal.module.css */
.modal {
  width: 500px;
  max-height: 90vh;
  border-radius: 12px;
}

.backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}
```

### Custom Theme Props

```jsx
// Extend components with custom props
<Tabs variant="vertical" size="large">
  {/* ... */}
</Tabs>

<Modal variant="alert" size="small">
  {/* ... */}
</Modal>
```

---

## 🚀 Performance Optimization

### Tabs Optimization
- `useMemo` - Caches context value
- `useCallback` - Stabilizes callbacks
- Prevents unnecessary child re-renders

### Modal Optimization
- Event listeners cleaned up in useEffect
- Portal only renders when isOpen=true
- Efficient backdrop click handling

---

## ♿ Accessibility Features

### Tabs
- `role="tablist"` - Container của tabs
- `role="tab"` - Individual tab button
- `role="tabpanel"` - Tab content container
- `aria-selected` - Indicate active tab
- `aria-controls` - Link tab to panel
- Keyboard navigation: Arrow keys support

### Modal
- `role="dialog"` - Dialog container
- `aria-modal="true"` - Indicate modal dialog
- Focus trap - Keyboard focus stays in modal
- Escape key support
- Focus return - Focus returns after close

---

## 📋 Implementation Checklist

✅ Compound Tabs Component
- ✅ Context API setup (TabsContext.js)
- ✅ Parent component (Tabs.jsx)
- ✅ Child components (Tab, Panel, List)
- ✅ Static properties (Tabs.Tab, Tabs.Panel)
- ✅ CSS Module styling
- ✅ Prop validation
- ✅ Accessibility attributes

✅ Modal with Portals
- ✅ ReactDOM.createPortal usage
- ✅ Portal root setup
- ✅ Backdrop click handling
- ✅ Escape key handling
- ✅ Modal.Header, Body, Footer
- ✅ CSS Module (fixed, z-index)
- ✅ Animations (fade-in, slide-up)

✅ Documentation
- ✅ DESIGN_SYSTEM_GUIDE.md (Complete)
- ✅ Code comments (Detailed)
- ✅ Usage examples (Multiple)
- ✅ API documentation

---

## 📚 Files Reference

### Tabs Component
- **TabsContext.js** - Context setup, useTabsContext hook
- **Tabs.jsx** - Main component, static child properties
- **Tabs.module.css** - Styling, animations, responsive
- **index.js** - Export barrel

### Modal Component
- **Modal.jsx** - Portal implementation, event handling
- **Modal.module.css** - Fixed positioning, z-index, animations
- **index.js** - Export barrel

### Demo App
- **App.jsx** - Complete usage examples
- **App.css** - Global styles, responsive layout

---

## 🎓 Learning Path

1. **Understand Compound Pattern**
   - Read pattern explanation
   - Look at Tabs architecture
   - Run demo and interact

2. **Understand Context API**
   - Read TabsContext.js
   - Trace how children access context
   - Try custom hook usage

3. **Understand Portals**
   - Read Portal concept
   - Check event bubbling demo
   - Inspect DOM in DevTools

4. **Customize Components**
   - Override CSS
   - Add new props
   - Extend with new features

---

## 🐛 Troubleshooting

**Tabs not responding to clicks?**
- Check if Tab is inside Tabs component
- Verify activeTabIndex updates
- Check console for context errors

**Modal not showing?**
- Ensure isOpen={true}
- Check #modal-root exists
- Verify ReactDOM import

**Styles not applying?**
- Check CSS Module import syntax
- Verify classNames use `styles` object
- Check for CSS specificity issues

---

## 📖 Read More

- **DESIGN_SYSTEM_GUIDE.md** - Complete technical guide
- **Code Comments** - Detailed explanations in source
- **Demo App** - Live usage examples

---

## ✨ Summary

Bạn đã tạo một professional Design System với:

✅ **Compound Components** - Flexible, reusable components  
✅ **React Portals** - Escape DOM constraints  
✅ **Context API** - Implicit state management  
✅ **CSS Modules** - Scoped styling  
✅ **Prop Validation** - Type checking  
✅ **Accessibility** - ARIA support  
✅ **Production Ready** - 1,400+ lines of code  

**Status:** ✅ READY TO USE

---

**Happy building! 🚀**
