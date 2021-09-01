import { FC, useState } from 'react';

type TypeDropdownNav = {
  title: string,
  children: any
}

const DropdownNav: FC<any> = ({ title, children }: TypeDropdownNav) => {
  const [isDropdown, setDropdown] = useState<boolean>(false)

  const handleOutside = () => {
    if (isDropdown) setDropdown(false);
  }

  return (
    <>
      <div className="dropdown inline ml-4">
        <button
          className="btn dropdown-toggle btn-dropdown"
          type="button"
          onClick={() => setDropdown(!isDropdown)}
        >
          {title}
        </button>
        <div className="dropdown-menu dropdown-menu-right dropdown-lastino" style={{ display: isDropdown ? 'block' : 'none' }}>
          {children}
        </div>
        <div className="bg-outside" style={{ display: isDropdown ? 'block' : 'none' }} onClick={() => handleOutside()}></div>
      </div>
    </>
  )
}

export default DropdownNav;