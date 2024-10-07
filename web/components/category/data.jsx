import { FaReact, FaRust, FaPython, FaSass } from 'react-icons/fa';
import {
  SiDocker,
  SiDjango,
  SiSpring,
  SiKubernetes,
  SiMongodb,
  SiJavascript,
  SiNextdotjs,
  SiTypescript,
  SiHelm,
  SiPrometheus,
  SiGrafana,
  SiJenkins,
  SiRedux,
  SiFlask,
} from 'react-icons/si';
import { FaGolang } from 'react-icons/fa6';

export const CATEGORY_DATA = {
  REACT: {
    logo: <FaReact />,
    color: '#7cc5d9',
    transparentColor: 'rgba(124, 197, 217, 0.3)',
    hsl: {
      hue: 193,
      saturation: 43,
      lightness: 60,
    },
  },
  DOCKER: {
    logo: <SiDocker />,
    color: '#0db7ed',
    transparentColor: 'rgba(13, 183, 237, 0.3)',
    hsl: {
      hue: 194,
      saturation: 95,
      lightness: 45,
    },
  },
  RUST: {
    logo: <FaRust />,
    color: '#242424',
    transparentColor: 'rgba(36, 36, 36, 0.3)',
    hsl: {
      hue: 0,
      saturation: 0,
      lightness: 16,
    },
  },
  PYTHON: {
    logo: <FaPython />,
    color: 'linear-gradient(to right, #306998 50%, #FFD43B 50%)',
    transparentColor:
      'linear-gradient(to right, rgba(48, 105, 152, 0.3) 50%, rgba(255, 212, 59, 0.3) 50%)',
    hsl: [
      {
        hue: 207,
        saturation: 68,
        lightness: 36,
      },
      {
        hue: 47,
        saturation: 77,
        lightness: 50,
      },
    ],
  },
  DJANGO: {
    logo: <SiDjango />,
    color: '#092e20',
    transparentColor: 'rgba(9, 46, 32, 0.3)',
    hsl: {
      hue: 157,
      saturation: 80,
      lightness: 13,
    },
  },
  SPRING: {
    logo: <SiSpring />,
    color: '#7CBB5D',
    transparentColor: 'rgba(124, 187, 93, 0.3)',
    hsl: {
      hue: 100,
      saturation: 50,
      lightness: 50,
    },
  },
  KUBERNETES: {
    logo: <SiKubernetes />,
    color: '#3970e4',
    transparentColor: 'rgba(57, 112, 228, 0.3)',
    hsl: {
      hue: 221,
      saturation: 75,
      lightness: 52,
    },
  },
  MONGODB: {
    logo: <SiMongodb />,
    color: 'linear-gradient(to right, #00ED64 50%, #00684A 50%)',
    transparentColor:
      'linear-gradient(to right, rgba(0, 237, 100, 0.3) 50%, rgba(0, 104, 74, 0.3) 50%)',
    hsl: [
      {
        hue: 145,
        saturation: 100,
        lightness: 42,
      },
      {
        hue: 163,
        saturation: 100,
        lightness: 18,
      },
    ],
  },
  JAVASCRIPT: {
    logo: <SiJavascript />,
    color: '#F0DB4F',
    transparentColor: 'rgba(240, 219, 79, 0.3)',
    hsl: {
      hue: 52,
      saturation: 67,
      lightness: 59,
    },
  },
  TYPESCRIPT: {
    logo: <SiTypescript />,
    color: '#007acc',
  },
  HELM: {
    logo: <SiHelm />,
    color: '#002493',
  },
  PROMETHEUS: {
    logo: <SiPrometheus />,
    color: '#ff4646',
  },
  GRAFANA: {
    logo: <SiGrafana />,
    color: '#E56D2D',
  },
  JENKINS: {
    logo: <SiJenkins />,
    color: '#D33834',
  },
  SCSS: {
    logo: <FaSass />,
    color: '#cc6699',
  },
  REDUX: {
    logo: <SiRedux />,
    color: '#764ABC',
  },
  FLASK: {
    logo: <SiFlask />,
    color: '#242424',
  },
  'NEXT.JS': {
    logo: <SiNextdotjs />,
    color: '#242424',
    transparentColor: 'rgba(36, 36, 36, 0.3)',
    hsl: {
      hue: 0,
      saturation: 0,
      lightness: 16,
    },
  },
  GOLANG: {
    logo: <FaGolang></FaGolang>,
    color: '#00ADD8',
    transparentColor: 'rgba(0, 173, 216, 0.3)',
    hsl: {
      hue: 192,
      saturation: 100,
      lightness: 42,
    },
  },
};
