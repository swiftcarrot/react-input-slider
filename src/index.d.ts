import { Interpolation } from 'emotion';

interface SliderProps {
  axis?: 'x' | 'y' | 'xy';
  x?: number;
  xmax?: number;
  xmin?: number;
  y?: number;
  ymax?: number;
  ymin?: number;
  xstep?: number;
  ystep?: number;
  onChange?: (values: { x: number; y: number }) => void;
  onDragStart?: (e: MouseEvent) => void;
  onDragEnd?: (e: MouseEvent) => void;
  disabled?: boolean;
  styles?: {
    track?: Interpolation;
    active?: Interpolation;
    thumb?: Interpolation;
    disabled?: Interpolation;
  };
}

export default class Slider extends Component<SliderProps> {}