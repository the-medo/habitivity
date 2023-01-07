/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import React, { CSSProperties, lazy, Suspense, SVGAttributes, useMemo } from 'react';
import { IconContext } from 'react-icons';
import { isKeyOfObject } from '../../helpers/isKeyOfObject';

interface DynamicIconProps {
  icon: string;
  color?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
  attr?: SVGAttributes<SVGElement>;
  fallback: JSX.Element | null;
}

const reactIconPackages = {
  ai: () => import(`react-icons/ai/index.js`),
  bs: () => import(`react-icons/bs/index.js`),
  bi: () => import(`react-icons/bi/index.js`),
  ci: () => import(`react-icons/ci/index.js`),
  di: () => import(`react-icons/di/index.js`),
  fi: () => import(`react-icons/fi/index.js`),
  fc: () => import(`react-icons/fc/index.js`),
  fa: () => import(`react-icons/fa/index.js`),
  gi: () => import(`react-icons/gi/index.js`),
  go: () => import(`react-icons/go/index.js`),
  gr: () => import(`react-icons/gr/index.js`),
  hi: () => import(`react-icons/hi/index.js`),
  hi2: () => import(`react-icons/hi2/index.js`),
  im: () => import(`react-icons/im/index.js`),
  io: () => import(`react-icons/io/index.js`),
  io5: () => import(`react-icons/io5/index.js`),
  md: () => import(`react-icons/md/index.js`),
  rx: () => import(`react-icons/rx/index.js`),
  ri: () => import(`react-icons/ri/index.js`),
  si: () => import(`react-icons/si/index.js`),
  sl: () => import(`react-icons/sl/index.js`),
  tb: () => import(`react-icons/ti/index.js`),
  tfi: () => import(`react-icons/ti/index.js`),
  vsc: () => import(`react-icons/vsc/index.js`),
  wi: () => import(`react-icons/wi/index.js`),
  cg: () => import(`react-icons/cg/index.js`),
};

const DynamicIcon: React.FC<DynamicIconProps> = ({ ...props }) => {
  const possibleLibraries: string[] = useMemo(() => {
    const twoLetters = props.icon.slice(0, 2);
    const threeLetters = props.icon.slice(0, 3);
    const finalPackages: string[] = [];

    if (['Vsc', 'Tfi'].includes(threeLetters)) {
      finalPackages.push(threeLetters.toLowerCase());
    } else {
      // Ionicons 5 have the same prefix as Ionicons 4
      // HeroIcons 2 have the same prefix as HeroIcons
      finalPackages.push(twoLetters.toLowerCase());
      if (twoLetters === 'Io') {
        finalPackages.push('io5');
      } else if (twoLetters === 'Hi') {
        finalPackages.push('hi2');
      }
    }

    console.log('finalPackages', finalPackages);
    return finalPackages;
  }, [props.icon]);

  const Icon = lazy(async () => {
    const lib = possibleLibraries[0];
    const iconName = props.icon;
    if (isKeyOfObject(lib, reactIconPackages)) {
      let module = await reactIconPackages[lib]();
      if (isKeyOfObject(iconName, module)) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (iconName !== 'default') return { default: module[iconName] };
      } else if (possibleLibraries.length > 1) {
        const lib = possibleLibraries[1];
        if (isKeyOfObject(lib, reactIconPackages)) {
          module = await reactIconPackages[lib]();
          if (isKeyOfObject(iconName, module)) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (iconName !== 'default') return { default: module[iconName] };
          }
        }
      }
    }

    const defaultModule = await reactIconPackages.gr();
    return { default: defaultModule.GrStatusUnknown };
  });

  const value: IconContext = useMemo(
    () => ({
      color: props.color,
      size: props.size,
      className: props.className,
      style: props.style,
      attr: props.attr,
    }),
    [props.attr, props.className, props.color, props.size, props.style],
  );

  return (
    <Suspense fallback={props.fallback}>
      <IconContext.Provider value={value}>
        <Icon />
      </IconContext.Provider>
    </Suspense>
  );
};

export default DynamicIcon;
