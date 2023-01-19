/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import React, { CSSProperties, lazy, Suspense, SVGAttributes, useMemo } from 'react';
import { isKeyOfObject } from '../../helpers/isKeyOfObject';
import styled from 'styled-components';

// listing all of these like this, because VITE has problem with dynamic imports

type IconPackages =
  | 'ai'
  | 'bi'
  | 'bs'
  | 'ci'
  | 'di'
  | 'fa'
  | 'fi'
  | 'go'
  | 'gr'
  | 'im'
  | 'io'
  | 'io5'
  | 'md'
  | 'ri'
  | 'rx'
  | 'wi'
  | 'fc'
  | 'gi'
  | 'hi'
  | 'hi2'
  | 'si'
  | 'sl'
  | 'tb'
  | 'tfi'
  | 'vsc'
  | 'cg';

const reactIconPackages: Record<IconPackages, any> = {
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

const loadedPackages: Record<IconPackages, any> = {
  ai: undefined,
  bi: undefined,
  bs: undefined,
  cg: undefined,
  ci: undefined,
  di: undefined,
  fa: undefined,
  fc: undefined,
  fi: undefined,
  gi: undefined,
  go: undefined,
  gr: undefined,
  hi: undefined,
  hi2: undefined,
  im: undefined,
  io: undefined,
  io5: undefined,
  md: undefined,
  ri: undefined,
  rx: undefined,
  si: undefined,
  sl: undefined,
  tb: undefined,
  tfi: undefined,
  vsc: undefined,
  wi: undefined,
};

export const DynamicIconWrapper = styled.span<{ $small?: boolean }>`
  display: inline-flex;
  align-items: center;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.25em;
  text-rendering: optimizeLegibility;

  svg {
    display: inline-block;
    line-height: 1;
    width: ${({ $small }) => ($small ? '1em' : '1.25em')};
    height: ${({ $small }) => ($small ? '1em' : '1.25em')};
  }

  & + span {
    margin-left: 0.5rem;
  }
`;

interface DynamicIconProps {
  icon: string;
  color?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
  attr?: SVGAttributes<SVGElement>;
  fallback?: JSX.Element | null;
  onClick?: () => void;
  showWrapper?: boolean;
  small?: boolean;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  fallback = null,
  showWrapper = true,
  small = false,
  ...props
}) => {
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

    return finalPackages;
  }, [props.icon]);

  const Icon = useMemo(
    () =>
      lazy(async () => {
        const lib = possibleLibraries[0];
        const iconName = props.icon;
        if (isKeyOfObject(lib, reactIconPackages)) {
          let module = loadedPackages[lib] ? loadedPackages[lib] : await reactIconPackages[lib]();
          if (isKeyOfObject(iconName, module)) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (iconName !== 'default') return { default: module[iconName] };
          } else if (possibleLibraries.length > 1) {
            const lib = possibleLibraries[1];
            if (isKeyOfObject(lib, reactIconPackages)) {
              module = loadedPackages[lib] ? loadedPackages[lib] : await reactIconPackages[lib]();
              if (isKeyOfObject(iconName, module)) {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (iconName !== 'default') return { default: module[iconName] };
              }
            }
          }
        }

        const defaultModule = loadedPackages.gr ? loadedPackages.gr : await reactIconPackages.gr();
        return { default: defaultModule.GrStatusUnknown };
      }),
    [props.icon, possibleLibraries],
  );

  return (
    <Suspense fallback={fallback ?? <DynamicIconWrapper $small={small} />}>
      {showWrapper ? (
        <DynamicIconWrapper $small={small}>
          <Icon {...props} />
        </DynamicIconWrapper>
      ) : (
        <Icon {...props} />
      )}
    </Suspense>
  );
};

export default React.memo(DynamicIcon);
