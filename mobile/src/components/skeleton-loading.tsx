import React, { ReactNode, useEffect, useId, useRef } from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";
import { theme } from "../../config/theme";


export interface SkeletonItem {
  width: number | string;
  height?: number | string;
  flex?: number;
  borderRadius?: number;
  marginBottom?: number;
  children?: ReactNode;
  backgroundColor?: string;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  padding?: number;
}

interface SkeletonLoadingViewProps {
  duration?: number;
  from?: number;
  config: SkeletonItem[];
  containerStyle?: ViewStyle;
}

const SkeletonLoadingView: React.FC<SkeletonLoadingViewProps> = ({
  duration = 1500,
  from = 1,
  config,
  containerStyle,
}) => {
  const opacityAnimation = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animateSkeleton = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnimation, {
            toValue: from,
            duration: duration / 2,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnimation, {
            toValue: from * 0.3,
            duration: duration / 2,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    animateSkeleton();

    return () => {
      opacityAnimation.setValue(0.3);
      opacityAnimation.stopAnimation();
    };
  }, [duration, from, opacityAnimation]);

  const getStyle = ({ children, ...item }: SkeletonItem): ViewStyle => {
    // @ts-expect-error
    return {
      ...item,
      opacity: opacityAnimation as any,
      backgroundColor: item.backgroundColor || theme.colors.border,
    };
  };

  const id = useId();

  return (
    <View style={containerStyle}>
      {config.map((item, index) => {
        const key = `skeleton-item-${index}-${id}`;
        return (
          <Animated.View
            key={key}
            style={[styles.skeletonItem, getStyle(item)]}
          >
            {item?.children}
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonItem: {
    marginBottom: 8,
  },
});

export default SkeletonLoadingView;