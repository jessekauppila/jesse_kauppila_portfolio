'use client';

import { useState, useRef, useEffect } from 'react';

export default function ContactDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <li
      className="nav_menu-list-item"
      ref={dropdownRef}
      style={{ position: 'relative' }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="nav_link on-accent-primary w-inline-block"
        style={{
          border: 'none',
          cursor: 'pointer',
          font: 'inherit',
        }}
      >
        <div>Contact</div>
      </button>
      {isOpen && (
        <div
          className="paragraph"
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '0.5rem',
            padding: '1rem',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            minWidth: '280px',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <p className="paragraph" style={{ margin: 0 }}>
              Bellingham, WA
            </p>
            <p className="paragraph" style={{ margin: 0 }}>
              510-866-9737
            </p>
            <p className="paragraph" style={{ margin: 0 }}>
              jessekauppila@gmail.com
            </p>
            <a
              href="https://github.com/jessekauppila"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              github.com/jessekauppila
            </a>
            <a
              href="https://linkedin.com/in/jessekauppila"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              linkedin.com/in/jessekauppila
            </a>
          </div>
        </div>
      )}
    </li>
  );
}
