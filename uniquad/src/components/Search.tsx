'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';


// import { cn } from '@/lib/cn';
// import { useObjectRef } from '@react-aria/utils';
import { SVGProps, forwardRef, useCallback } from 'react';
// import { AriaTextFieldProps, useTextField } from 'react-aria';

function SvgClose(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill={props.fill} viewBox="0 0 24 24" {...props}>
      <path
        strokeWidth={props.strokeWidth || 2}
        d="m6 6 6.387 6.387m0 0 6.387 6.387m-6.387-6.387L6 18.774m6.387-6.387L18.774 6"
        className="close_svg__close-svg"
      />
    </svg>
  );
}
export default SvgClose;

function SvgSearch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m21 21-3-3m2-7a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

export function DiscoverSearch({ label = 'Search People' }: { label?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleChange = useCallback(
    (search: string) => {
      const params = new URLSearchParams(searchParams);
      if (search === '') {
        params.delete('search');
      } else {
        params.set('search', search);
      }

      const url = `${pathname}?${params.toString()}`;
      router.push(url, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return (
    <div className="sticky top-4 z-[2] mb-4">
      <input />
    </div>
  );
}

// interface TextInputProps extends AriaTextFieldProps {
//   className?: string;
//   Icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
// }


// const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ className, Icon, ...props }, forwardedRef) => {
//   // Support forwarded refs: https://github.com/adobe/react-spectrum/pull/2293#discussion_r714337674
//   const ref = useObjectRef(forwardedRef);
//   const { labelProps, inputProps, errorMessageProps } = useTextField(props, ref);
//   const { errorMessage, label } = props;
//   const isError = errorMessage !== undefined;

//   const clear = useCallback(() => {
//     // Set the input value to an empty string
//     if (ref.current) {
//       ref.current.value = '';
//     }
//     // If `onChange` is provided, invoke it with an empty string
//     if (props.onChange) {
//       props.onChange('');
//     }
//   }, [props, ref]);

//   return (
//     <>
//       <div className="relative">
//         {Icon && (
//           <div className="absolute left-5 top-[50%] translate-y-[-50%]">
//             <Icon
//               className={cn(isError ? 'stroke-destructive-foreground' : 'stroke-muted-foreground')}
//               width={24}
//               height={24}
//             />
//           </div>
//         )}
//         <input
//           {...inputProps}
//           ref={ref}
//           className={cn(
//             'peer w-full rounded-2xl bg-input pb-2 pr-5 pt-8 outline-none ring-foreground focus:ring-2',
//             Icon ? 'pl-16' : 'pl-5',
//             isError && 'bg-destructive ring-destructive-foreground focus:ring-4',
//             className,
//           )}
//           placeholder=" "
//         />
//         <label
//           className={cn(
//             'absolute top-[9px] z-0 translate-y-0 cursor-text text-sm transition-all peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:text-lg peer-focus:top-[9px] peer-focus:translate-y-0 peer-focus:text-sm',
//             Icon ? 'left-16' : 'left-5',
//             isError ? 'text-destructive-foreground' : 'text-muted-foreground',
//           )}
//           {...labelProps}>
//           {label}
//         </label>
//         {/* <Button
//           Icon={SvgClose}
//           iconClassName="stroke-muted-foreground"
//           mode="ghost"
//           size="small"
//           onPress={clear}
//           className="absolute right-5 top-[50%] z-[1] block translate-y-[-50%] peer-placeholder-shown:hidden"
//           aria-label="Clear"
//         /> */}
//       </div>
//       {isError && (
//         <p className="mt-2 font-medium text-foreground" {...errorMessageProps}>
//           {errorMessage as string}
//         </p>
//       )}
//     </>
//   );
// });

// TextInput.displayName = 'TextInput';


