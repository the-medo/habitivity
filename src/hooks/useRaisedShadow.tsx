import { animate, MotionValue, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const inactiveShadow = "0px 0px 0px rgba(0,0,0,0.8)";

export function useRaisedShadow(value: MotionValue<number>) {
    const boxShadow = useMotionValue(inactiveShadow);

    useEffect(() => {
        let isActive = false;
        value.onChange((latest) => {
            const wasActive = isActive;
            if (latest !== 0) {
                isActive = true;
                if (isActive !== wasActive) {
                    animate(boxShadow, "5px 5px 10px rgba(0,0,0,0.3)");
                }
            } else {
                isActive = false;
                if (isActive !== wasActive) {
                    animate(boxShadow, inactiveShadow);
                }
            }
        });
    }, [value, boxShadow]);

    return boxShadow;
}


/*
https://codesandbox.io/s/framer-motion-5-drag-to-reorder-lists-with-drag-handle-forked-j94p0r?file=/src/Item.tsx:458-489

USAGE:

Component:
    const y = useMotionValue(20);
    const boxShadow = useRaisedShadow(y);

Reorder.Item props:
    style={{ boxShadow, y }}

 */