declare module "react-simple-maps" {
  import { ReactNode, MouseEventHandler } from "react";

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
    children?: ReactNode;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: GeoJSONFeature[] }) => ReactNode;
  }

  export interface GeoJSONFeature {
    rsmKey?: string;
    [key: string]: unknown;
  }

  export interface GeographyProps {
    key?: string;
    geography: GeoJSONFeature;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    onMouseEnter?: MouseEventHandler;
    onMouseLeave?: MouseEventHandler;
    onClick?: MouseEventHandler;
    className?: string;
  }

  export interface MarkerProps {
    key?: string;
    coordinates: [number, number];
    children?: ReactNode;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
    className?: string;
  }

  export function ComposableMap(props: ComposableMapProps): JSX.Element;
  export function Geographies(props: GeographiesProps): JSX.Element;
  export function Geography(props: GeographyProps): JSX.Element;
  export function Marker(props: MarkerProps): JSX.Element;
}
