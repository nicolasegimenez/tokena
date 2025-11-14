import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode, FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language";

interface ProgressSliderContextType {
  active: string;
  progress: number;
  handleButtonClick: (value: string) => void;
}

const ProgressSliderContext = createContext<ProgressSliderContextType | undefined>(undefined);

const useProgressSliderContext = (): ProgressSliderContextType => {
  const context = useContext(ProgressSliderContext);
  if (!context) {
    throw new Error('useProgressSliderContext must be used within a ProgressSlider');
  }
  return context;
};

interface ProgressSliderProps {
  children: ReactNode;
  duration?: number;
  fastDuration?: number;
  activeSlider: string;
  className?: string;
}

const ProgressSlider: FC<ProgressSliderProps> = ({
  children,
  duration = 5000,
  fastDuration = 400,
  activeSlider,
  className,
}) => {
  const [active, setActive] = useState<string>(activeSlider);
  const [progress, setProgress] = useState<number>(0);
  const [isFastForward, setIsFastForward] = useState<boolean>(false);
  const frame = useRef<number>(0);
  const firstFrameTime = useRef<number>(performance.now());
  const targetValue = useRef<string | null>(null);
  const [sliderValues, setSliderValues] = useState<string[]>([]);

  useEffect(() => {
    const getChildren = React.Children.toArray(children).find(
      (child) => (child as React.ReactElement).type === SliderContent
    ) as React.ReactElement<{ children: ReactNode }> | undefined;

    if (getChildren) {
      const values = React.Children.toArray(getChildren.props.children).map(
        (child) => (child as React.ReactElement<{ value: string }>).props.value as string
      );
      setSliderValues(values);
    }
  }, [children]);

  useEffect(() => {
    if (sliderValues.length > 0) {
      firstFrameTime.current = performance.now();
      frame.current = requestAnimationFrame(animate);
    }
    return () => {
      cancelAnimationFrame(frame.current);
    };
  }, [sliderValues, active, isFastForward]);

  const animate = (now: number) => {
    const currentDuration = isFastForward ? fastDuration : duration;
    const elapsedTime = now - firstFrameTime.current;
    const timeFraction = elapsedTime / currentDuration;

    if (timeFraction <= 1) {
      setProgress(
        isFastForward
          ? progress + (100 - progress) * timeFraction
          : timeFraction * 100
      );
      frame.current = requestAnimationFrame(animate);
    } else {
      if (isFastForward) {
        setIsFastForward(false);
        if (targetValue.current !== null) {
          setActive(targetValue.current);
          targetValue.current = null;
        }
      } else {
        const currentIndex = sliderValues.indexOf(active);
        const nextIndex = (currentIndex + 1) % sliderValues.length;
        setActive(sliderValues[nextIndex]);
      }
      setProgress(0);
      firstFrameTime.current = performance.now();
    }
  };

  const handleButtonClick = (value: string) => {
    if (value !== active) {
      const elapsedTime = performance.now() - firstFrameTime.current;
      const currentProgress = (elapsedTime / duration) * 100;
      setProgress(currentProgress);
      targetValue.current = value;
      setIsFastForward(true);
      firstFrameTime.current = performance.now();
    }
  };

  return (
    <ProgressSliderContext.Provider
      value={{ active, progress, handleButtonClick }}
    >
      <div className={cn('relative', className)}>{children}</div>
    </ProgressSliderContext.Provider>
  );
};

interface SliderContentProps {
  children: ReactNode;
  className?: string;
}

const SliderContent: FC<SliderContentProps> = ({ children, className }) => {
  return <div className={cn('', className)}>{children}</div>;
};

interface SliderWrapperProps {
  children: ReactNode;
  value: string;
  className?: string;
}

const SliderWrapper: FC<SliderWrapperProps> = ({ children, value, className }) => {
  const { active } = useProgressSliderContext();

  return (
    <AnimatePresence mode='popLayout'>
      {active === value && (
        <motion.div
          key={value}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn('', className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface SliderBtnGroupProps {
  children: ReactNode;
  className?: string;
}

const SliderBtnGroup: FC<SliderBtnGroupProps> = ({ children, className }) => {
  return <div className={cn('', className)}>{children}</div>;
};

interface SliderBtnProps {
  children: ReactNode;
  value: string;
  className?: string;
  progressBarClass?: string;
}

const SliderBtn: FC<SliderBtnProps> = ({
  children,
  value,
  className,
  progressBarClass,
}) => {
  const { active, progress, handleButtonClick } = useProgressSliderContext();

  return (
    <button
      className={cn(
        `relative ${active === value ? 'opacity-100' : 'opacity-50'} transition-opacity`,
        className
      )}
      onClick={() => handleButtonClick(value)}
    >
      {children}
      <div
        className='absolute inset-0 overflow-hidden -z-10 max-h-full max-w-full'
        role='progressbar'
        aria-valuenow={active === value ? progress : 0}
      >
        <span
          className={cn('absolute left-0 top-0 h-full', progressBarClass)}
          style={{
            width: active === value ? `${progress}%` : '0%',
          }}
        />
      </div>
    </button>
  );
};

interface Investment {
  id: number;
  title: string;
  description: string;
  image: string;
}

const CarouselApp = () => {
  const { t } = useLanguage();

  const investments: Investment[] = [
    {
      id: 1,
      title: t("tokenized_apartments_title"),
      description: t("tokenized_apartments_desc"),
      image: "https://res.cloudinary.com/dhacybdxf/image/upload/v1762299810/edificio_qhi0ri.png"
    },
    {
      id: 2,
      title: t("crypto_fund_title"),
      description: t("crypto_fund_desc"),
      image: "https://res.cloudinary.com/dhacybdxf/image/upload/v1762299809/ethereum_vs8k4y.png"
    },
    {
      id: 3,
      title: t("tokenized_startup_title"),
      description: t("tokenized_startup_desc"),
      image: "https://res.cloudinary.com/dhacybdxf/image/upload/v1762299809/startup_tb5wu3.png"
    }
  ];

  const firstSlider = investments[0]?.id.toString() || "1";

  return (
    <ProgressSlider activeSlider={firstSlider} duration={5000} className="w-full">
      <SliderContent className="relative w-full aspect-video rounded-xl overflow-hidden">
        {investments.map((investment) => (
          <SliderWrapper key={investment.id} value={investment.id.toString()} className="w-full h-full">
            <div className="relative w-full h-full">
              <img
                src={investment.image}
                alt={investment.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{investment.title}</h3>
                <p className="text-sm line-clamp-2">{investment.description}</p>
              </div>
            </div>
          </SliderWrapper>
        ))}
      </SliderContent>

      <SliderBtnGroup className="absolute bottom-0 left-0 right-0 h-fit dark:text-white text-black dark:bg-black/40 bg-white/40 backdrop-blur-md overflow-hidden grid grid-cols-3 gap-0">
        {investments.map((investment) => (
          <SliderBtn
            key={investment.id}
            value={investment.id.toString()}
            className="text-left cursor-pointer p-4 border-r dark:border-white/20 border-black/20 last:border-r-0"
            progressBarClass="dark:bg-white bg-black"
          >
            <h4 className="font-semibold text-sm md:text-base mb-1">{investment.title}</h4>
            <p className="text-xs line-clamp-1">{investment.description}</p>
          </SliderBtn>
        ))}
      </SliderBtnGroup>
    </ProgressSlider>
  );
};

export default CarouselApp