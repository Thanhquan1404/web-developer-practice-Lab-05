# 🎨 Design System Components - Complete Guide

## 📋 Project Overview

Advanced React patterns implementation featuring:
- **Compound Components Pattern** với Tabs
- **React Context API** cho state management
- **React Portals** cho Modal
- **Professional Styling** với CSS Modules
- **Prop Validation** với prop-types
- **Accessibility** (WAI-ARIA)

---

## 🏗️ Project Structure

```
src/
├── components/
│   └── ui/
│       ├── Tabs/
│       │   ├── index.js              ✅ Export barrel
│       │   ├── Tabs.jsx              ✅ Main component
│       │   ├── Tabs.module.css       ✅ Styling
│       │   └── TabsContext.js        ✅ Context setup
│       │
│       ├── Modal/
│       │   ├── index.js              ✅ Export barrel
│       │   ├── Modal.jsx             ✅ Portal implementation
│       │   └── Modal.module.css      ✅ Fixed positioning + animations
│       │
│       └── index.js                  ✅ Central export
│
├── App.jsx                           ✅ Complete demo
└── App.css                           ✅ Global styles
```

---

## 📖 TASK 1: Compound Tabs Component

### Pattern: Compound Component

Compound Components cho phép parent và children share state một cách implicit (ẩn danh) mà không cần prop drilling.

### Architecture

```jsx
// Parent component - Cung cấp context
<Tabs initialIndex={0}>
  {/* Child components - Share state thông qua context */}
  <Tabs.List>
    <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
    <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
  </Tabs.List>
  
  <Tabs.Panel index={0}>Content 1</Tabs.Panel>
  <Tabs.Panel index={1}>Content 2</Tabs.Panel>
</Tabs>
```

### Components

#### 1. **TabsContext.js** - Context Setup
- `TabsContext` - Context object
- `TabsProvider` - Wrapper component
- `useTabsContext()` - Custom hook để lấy context

```javascript
const { activeTabIndex, setActiveTabIndex } = useTabsContext();
```

#### 2. **Tabs.jsx** - Main Component

**Parent Component (Tabs)**
- Quản lý `activeTabIndex` state
- Cung cấp value thông qua TabsContext.Provider
- Props:
  - `initialIndex` - Tab active ban đầu
  - `onTabChange` - Callback khi tab thay đổi

**Child Components** (static properties):
- `Tabs.List` - Container cho tab buttons
- `Tabs.Tab` - Individual tab button
  - Props: `index` (required), `children`, `className`
  - onClick: Cập nhật activeTabIndex
- `Tabs.Panel` - Nội dung tab
  - Props: `index` (required), `children`, `className`
  - Chỉ render khi index === activeTabIndex

**Key Features:**
- ✅ Context API - Implicit state management
- ✅ Static Properties - Clean API (Tabs.Tab, Tabs.Panel)
- ✅ WAI-ARIA Support - Accessibility attributes
- ✅ Flexible Composition - Chèn markup tùy ý
- ✅ Optimization - useMemo, useCallback

### CSS Styling

**Tabs.module.css** cung cấp:
- Tab list styling với scroll support
- Active tab indicator (border-bottom)
- Hover states
- Fade-in animation cho panel
- Responsive design (mobile-friendly)
- Dark mode support

### Usage Examples

**Basic Usage:**
```jsx
<Tabs initialIndex={0}>
  <Tabs.List>
    <Tabs.Tab index={0}>First</Tabs.Tab>
    <Tabs.Tab index={1}>Second</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel index={0}>Content 1</Tabs.Panel>
  <Tabs.Panel index={1}>Content 2</Tabs.Panel>
</Tabs>
```

**With Callbacks:**
```jsx
<Tabs 
  initialIndex={0} 
  onTabChange={(index) => console.log('Tab changed:', index)}
>
  {/* ... */}
</Tabs>
```

**Flexible Layout (Custom Markup):**
```jsx
<Tabs>
  <Tabs.List>
    <Tabs.Tab index={0}>Home</Tabs.Tab>
    <Tabs.Tab index={1}>Docs</Tabs.Tab>
  </Tabs.List>
  
  {/* Custom markup - Không làm hỏng logic! */}
  <hr style={{ margin: '0' }} />
  
  <Tabs.Panel index={0}>Home content</Tabs.Panel>
  <Tabs.Panel index={1}>Docs content</Tabs.Panel>
</Tabs>
```

### Why Compound Pattern?

✅ **No Prop Drilling**: Children tự access state từ Context  
✅ **Flexible**: Không ép người dùng theo structure cụ thể  
✅ **Encapsulation**: Internal state không lộ ra ngoài  
✅ **Clean API**: Tabs.Tab, Tabs.Panel rất trực quan  
✅ **Scalable**: Dễ thêm component mới (Tabs.Icon, Tabs.Badge, etc.)

---

## 📖 TASK 2: Modal with React Portals

### Pattern: React Portals

Portals cho phép render React component vào một DOM node khác, vượt qua DOM constraints như overflow:hidden hoặc z-index issues.

### Key Concept: Event Bubbling

**Important**: Mặc dù React component được render ở document.body, event vẫn bubble lên qua React component hierarchy (fiber tree), không phải DOM tree.

```
React Tree:           DOM Tree:
App                   <body>
├─ Modal              ├─ <div id="root">
│  └─ onClick    ✅     └─ App
│     bubbles          └─ <div id="modal-root">
                          └─ Modal (Portal)
                             └─ onClick
```

### Architecture

```jsx
// Trong App.jsx
<div onClick={handleAppClick}>
  <Modal isOpen={true}>
    <button onClick={handleButtonClick}>
      Click me!
    </button>
  </Modal>
</div>

// Event flow:
// 1. Click button inside Modal
// 2. handleButtonClick fires
// 3. Event bubbles through React tree (not DOM tree!)
// 4. handleAppClick fires
```

### Modal Component

**Props:**
- `isOpen` - Điều khiển hiển thị
- `onClose` - Callback khi close
- `closeOnEscape` - Close khi nhấn Esc (default: true)
- `closeOnBackdropClick` - Close khi click backdrop (default: true)
- `portalId` - ID của portal container (default: 'modal-root')
- `children` - Modal content

**Child Components** (static properties):
- `Modal.Header` - Header section
- `Modal.Body` - Main content
- `Modal.Footer` - Footer (usually buttons)

**Features:**
- ✅ React Portals - Render outside DOM tree
- ✅ Event Bubbling - Works correctly thông qua React fiber
- ✅ Keyboard Support - Esc to close
- ✅ Scroll Lock - Disable body scroll khi modal mở
- ✅ Focus Management - Modal có role="dialog"
- ✅ Animations - Fade-in + slide-up effects

### CSS Styling

**Modal.module.css** cung cấp:
- Fixed positioning (position: fixed)
- Z-index layering (backdrop: 1000, modal: 1001)
- Backdrop with blur effect
- Smooth animations (fadeInBackdrop, slideUpModal)
- Responsive layout (mobile-friendly)
- Dark mode support
- High contrast mode support

### Usage Examples

**Basic Modal:**
```jsx
const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <Modal.Header>Title</Modal.Header>
  <Modal.Body>Content here</Modal.Body>
  <Modal.Footer>
    <button onClick={() => setIsOpen(false)}>Close</button>
  </Modal.Footer>
</Modal>
```

**Event Bubbling Demo:**
```jsx
const handleAppClick = (e) => {
  console.log('Event bubbled to App!', e.target);
};

<div onClick={handleAppClick}>
  <Modal isOpen={true}>
    <button onClick={() => console.log('Button clicked')}>
      Click me - event will bubble!
    </button>
  </Modal>
</div>
```

**Escape & Backdrop Configuration:**
```jsx
<Modal 
  isOpen={isOpen}
  onClose={handleClose}
  closeOnEscape={true}      // ✅ Close on Esc
  closeOnBackdropClick={true} // ✅ Close on backdrop click
>
  {/* content */}
</Modal>
```

### Why Portals?

✅ **Escape Constraints**: Bypass overflow:hidden, z-index issues  
✅ **Full Screen**: Modal spans entire viewport, not container  
✅ **Event Bubbling**: Still works through React hierarchy  
✅ **Nested Modals**: Multiple portals work seamlessly  
✅ **Accessibility**: Better ARIA and focus management  
✅ **Cleaner Markup**: Modal stays with logical code location

---

## 🚀 How to Use

### Installation

Đảm bảo `prop-types` được cài:
```bash
npm install prop-types
```

### Basic Implementation

```jsx
import Tabs from './components/ui/Tabs';
import Modal from './components/ui/Modal';

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Tabs */}
      <Tabs initialIndex={0}>
        <Tabs.List>
          <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
          <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel index={0}>Content 1</Tabs.Panel>
        <Tabs.Panel index={1}>Content 2</Tabs.Panel>
      </Tabs>

      {/* Modal */}
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>Modal content</Modal.Body>
        <Modal.Footer>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
```

### Accessibility Requirements

1. **HTML setup** - Thêm modal root:
```html
<div id="root"></div>
<div id="modal-root"></div>
```

2. **ARIA attributes** - Được handle bởi components:
- `role="tablist"`, `role="tab"`, `role="tabpanel"`
- `role="dialog"`, `aria-modal="true"`

3. **Focus management** - Tự động khi modal mở/close

---

## 🎨 Styling & Customization

### Override Styles

**Using CSS Modules:**
```jsx
import styles from './Tabs.module.css';

// Classes: styles.tab, styles.active, styles['tab-panel']
```

**Custom Class Names:**
```jsx
<Tabs className="my-tabs">
  <Tabs.List className="my-tabs-list">
    <Tabs.Tab index={0} className="my-tab">Tab 1</Tabs.Tab>
  </Tabs.List>
</Tabs>
```

### Dark Mode

Both components support dark mode via `prefers-color-scheme: dark`

---

## 📊 Performance Optimization

### Tabs Component
- `useMemo` - Caches context value
- `useCallback` - Stabilizes event handlers
- Prevents unnecessary re-renders of child components

### Modal Component
- `useCallback` - Caches event handlers
- `useEffect` - Efficient listener management
- Cleanup on unmount

---

## ✅ Prop Validation

Both components sử dụng `prop-types` cho validation:

```javascript
Tab.propTypes = {
  index: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  // ... more
};
```

---

## 🧪 Testing

### Testing Tabs
```javascript
// Check active tab
expect(wrapper.find('[aria-selected=true]')).toHaveLength(1);

// Check panel visibility
expect(wrapper.find('.active').text()).toContain('Content 1');

// Simulate click
wrapper.find('button').at(0).simulate('click');
expect(wrapper.find('button').at(0).prop('aria-selected')).toBe(true);
```

### Testing Modal
```javascript
// Check portal rendering
const portalRoot = document.getElementById('modal-root');
expect(portalRoot.children.length).toBeGreaterThan(0);

// Test close on Esc
fireEvent.keyDown(document, { key: 'Escape' });
expect(onClose).toHaveBeenCalled();

// Test backdrop click
fireEvent.click(backdrop);
expect(onClose).toHaveBeenCalled();
```

---

## 📚 Key Concepts Summary

### Compound Components
- **Definition**: Parent cung cấp context/state, children tự organize
- **Benefits**: Flexible, no prop drilling, clean API
- **Use Cases**: Tabs, Accordion, Dropdown, Form

### Context API
- **Definition**: Share state qua component tree mà không prop drilling
- **Benefits**: Solves prop drilling, simpler API
- **Caution**: Can cause unnecessary re-renders if not optimized

### React Portals
- **Definition**: Render component vào DOM node khác
- **Benefits**: Escape DOM constraints, full-screen overlays
- **Event Bubbling**: Still works via React fiber hierarchy
- **Use Cases**: Modal, Tooltip, Notification, Popover

### CSS Modules
- **Definition**: Scoped CSS classes để tránh conflicts
- **Benefits**: No naming conflicts, explicit dependencies
- **Usage**: `import styles from './file.module.css'`

---

## 🐛 Common Issues & Solutions

### Tabs
**Q: Tab panel not showing?**  
A: Ensure Tabs.Panel index matches Tabs.Tab index

**Q: Event handler not working?**  
A: Check that parent has TabsContext (inside <Tabs> component)

### Modal
**Q: Modal being cut off by overflow:hidden?**  
A: This is why we use Portals! Modal renders to document.body

**Q: Event not bubbling?**  
A: Event bubbles through React tree, not DOM tree. Check React component hierarchy.

**Q: Multiple modals stacking?**  
A: Use different portalId or ensure proper z-index management

---

## 🚀 Best Practices

1. **Use Compound Pattern** cho components với multiple related parts
2. **Memoize expensive computations** với useMemo
3. **Stabilize callback references** với useCallback
4. **Provide accessible defaults** (ARIA, keyboard support)
5. **Test prop validation** carefully
6. **Document component API** clearly
7. **Support responsive design** from start
8. **Consider dark mode** support

---

## 📖 Further Reading

- [React Compound Components Pattern](https://kentcdodds.com/blog/compound-components-with-react-hooks)
- [Context API Best Practices](https://react.dev/reference/react/useContext)
- [React Portals Guide](https://react.dev/reference/react-dom/createPortal)
- [Accessibility in React](https://react.dev/learn/accessibility)

---

**Version:** 1.0  
**Author:** Design System Team  
**Status:** Production Ready ✅
