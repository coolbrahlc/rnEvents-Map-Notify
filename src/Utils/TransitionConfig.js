import {Animated, Easing} from "react-native";

const transitionConfig = () => ({
    transitionSpec: {
        duration: 750,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const thisSceneIndex = scene.index;

        const height = layout.initHeight;
        const translateY = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
            outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
            outputRange: [1, 1, 0.5],
        });

        return { opacity, transform: [{ translateY }] };
    },
})

export default transitionConfig;