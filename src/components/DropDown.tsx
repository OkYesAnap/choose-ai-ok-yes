import React, { CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react';

const DropDown: React.FC<{ items: string[], current: number, changeCallback: any }> = ({ items, current, changeCallback }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const openButtonRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [posCorrection, setPosCorrection] = useState<CSSProperties>({});
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

    const handleDropdownClick = (i: number) => {
        changeCallback(i);
        if(timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = (setTimeout(() => {setOpen(false)}, 200));
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node) &&
            !openButtonRef.current?.contains(event.target as Node)
        ) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, []);

    useLayoutEffect(() => {
        if (open && dropdownRef.current) {
            const heightDropdown = dropdownRef.current.offsetHeight;
            const recPos = dropdownRef.current.getBoundingClientRect();
            const pos: CSSProperties = {};
            if (recPos.top < 0) {
                pos.bottom = `-${heightDropdown}px`;
            } else {
                pos.top = `${-heightDropdown}px`;
            }
            setPosCorrection(pos);
            
        }
    }, [open, dropdownRef.current])

    const handleOpen = () => { setOpen(!open);  setPosCorrection({});}

    return (
        <div className={"relative flex-1"}>
            {open && <div
                style={posCorrection}
                ref={dropdownRef}
                className={"absolute z-10 mb-4 w-48 bg-black text-white border rounded-10 shadow-lg text-black left-1/2 -translate-x-1/2 max-w-fit"}>
                {items.map((item, i) => (
                    <div
                        className={`${i === current ? 'border rounded-10' : ''} p-2`}
                        key={item}
                        onClick={() => handleDropdownClick(i)}>{item}
                    </div>))}
            </div>}
            <div
                className='border border-white rounded-10 p-2 max-w-fit ml-auto mr-auto mb-3'
                ref={openButtonRef}
                onClick={handleOpen}>{items[current || 0]}
            </div>
        </div>)
}

export default DropDown;