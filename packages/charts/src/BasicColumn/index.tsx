import { Column, ColumnConfig as _ColumnConfig } from '@ant-design/plots';
import React from 'react';
import './index.less';

interface BasicColumnProps {
  config?: _ColumnConfig;
  data?: Array<{ type: string; sales: number }>;
}

export const ColumnConfig: React.FC<_ColumnConfig> = ({}) => <></>;

export default (props: BasicColumnProps) => {
  const { config, data } = props;

  const tempData = [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '生鲜水果',
      sales: 61,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
    {
      type: '母婴用品',
      sales: 48,
    },
    {
      type: '进口食品',
      sales: 38,
    },
    {
      type: '食品饮料',
      sales: 38,
    },
    {
      type: '家庭清洁',
      sales: 38,
    },
  ];

  const renderData = data || tempData;

  const renderConfig: _ColumnConfig = {
    data: renderData,
    xField: 'type',
    yField: 'sales',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
    ...config,
  };
  return <Column {...renderConfig} />;
};
