import { useMemo, forwardRef, CSSProperties } from 'react';


import classnames from 'classnames';

import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { useAutoResize } from '@vis/utils';
import './style.less';

const defaultColor = ['#3faacb', '#fff'];


const Decoration = forwardRef(({ reverse = false, dur = 6, className, style, color = [] }: {
  /** 自定义类名 */
  className: string;
  /** 自定义css属性 */
  style: CSSProperties;
  /**  颜色 */
  color: string[];
  /**  是否反向 */
  reverse: boolean;
  /** 动画执行周期 */
  dur: number;

}, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  function calcSVGData() {
    return reverse
      ? { w: 1, h: height, x: width / 2, y: 0 }
      : { w: width, h: 1, x: 0, y: height / 2 };
  }

  const mergedColor = useMemo(() => merge(cloneDeep(defaultColor), color || []), [color]);

  const { x, y, w, h } = useMemo(calcSVGData, [reverse, width, height]);

  const classNames = useMemo(() => classnames('dv-decoration-2', className), [
    className,
  ]);

  return (
    <div className={classNames} style={style} ref={domRef}>
      <svg width={`${width}px`} height={`${height}px`}>
        <rect x={x} y={y} width={w} height={h} fill={mergedColor[0]}>
          <animate
            attributeName={reverse ? 'height' : 'width'}
            from="0"
            to={reverse ? height : width}
            dur={`${dur}s`}
            calcMode="spline"
            keyTimes="0;1"
            keySplines=".42,0,.58,1"
            repeatCount="indefinite"
          />
        </rect>

        <rect x={x} y={y} width="1" height="1" fill={mergedColor[1]}>
          <animate
            attributeName={reverse ? 'y' : 'x'}
            from="0"
            to={reverse ? height : width}
            dur={`${dur}s`}
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.42,0,0.58,1"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  );
});

export default Decoration;
