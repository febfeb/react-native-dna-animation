import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Animated,
    Easing
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const DELTA_Y = 50;
const DURATION_PER_PHASE = 2000;

const DELTA_DEGREE = 45;

class DnaBall extends React.Component {
    constructor(props) {
        super(props);

        //hitung berdasarkan delay
        let t = props.delay; //tiap t = DELTA_DEGREE derajat
        let posisiYSaatDelay = Math.sin(t * DELTA_DEGREE * Math.PI / 180) * DELTA_Y;

        this.rotation = new Animated.Value(posisiYSaatDelay);

        this.inputRange = [];
        this.outputRange = [];
        this.outputRange2 = [];
        this.outputRangeScale = [];
        this.outputRangeScale2 = [];

        for (let i = 0; i <= 360; i += 10) {
            this.inputRange.push(i);
            this.outputRange.push(Math.sin(i * Math.PI / 180) * DELTA_Y);
            this.outputRange2.push(Math.sin((i+180) * Math.PI / 180) * DELTA_Y);

            this.outputRangeScale.push(1 - 0.2 * Math.cos(i * Math.PI / 180));
            this.outputRangeScale2.push(1 - 0.2 * Math.cos((i+180) * Math.PI / 180));
        }

        this.inputRangeZIndex = [0, 90, 180, 270, 360];
        this.outputRangeZIndex = [0, 0, 100, 0, 0];
        this.outputRangeZIndex2 = [100, 0, 0, 0, 2];
    }

    componentDidMount() {
        //inisialisasi agar posisi agak telat
        let delay = this.props.delay * DELTA_DEGREE / 360;
        let dur = DURATION_PER_PHASE - DURATION_PER_PHASE * delay;
        this.startAnimate(dur);
    }

    startAnimate(duration = null) {
        if(duration == null){
            duration = DURATION_PER_PHASE;
        }
        
        Animated.timing(this.rotation, {
            toValue: 360,
            duration: duration,
            useNativeDriver: true,
            easing: Easing.linear,
        }).start(() => {
            //reset value
            this.rotation.setValue(0);
            this.startAnimate();
        });
    }

    render() {
        return (
            <View style={styles.box}>
                <Animated.View style={{
                    transform: [
                        {
                            translateY: this.rotation.interpolate({
                                inputRange: this.inputRange,
                                outputRange: this.outputRange,
                                extrapolate: 'clamp',
                            })
                        },
                        { 
                            scale: this.rotation.interpolate({
                                inputRange: this.inputRange,
                                outputRange: this.outputRangeScale,
                                extrapolate: 'clamp',
                            })
                        },
                        { perspective: 1000 }
                    ],
                    zIndex: this.rotation.interpolate({
                        inputRange: this.inputRangeZIndex,
                        outputRange: this.outputRangeZIndex,
                        extrapolate: 'clamp',
                    }),
                    position: 'absolute',
                    top: -15,
                    left: 0
                }}>
                    <LinearGradient colors={['#cea5c9', '#af82b9', '#8466ac']} style={styles.circle}></LinearGradient>
                </Animated.View>

                <Animated.View style={{
                    transform: [
                        {
                            translateY: this.rotation.interpolate({
                                inputRange: this.inputRange,
                                outputRange: this.outputRange2,
                                extrapolate: 'clamp',
                            })
                        },
                        { 
                            scale: this.rotation.interpolate({
                                inputRange: this.inputRange,
                                outputRange: this.outputRangeScale2,
                                extrapolate: 'clamp',
                            })
                        },
                        { perspective: 1000 }
                    ],
                    zIndex: this.rotation.interpolate({
                        inputRange: this.inputRangeZIndex,
                        outputRange: this.outputRangeZIndex2,
                        extrapolate: 'clamp',
                    }),
                    position: 'absolute',
                    top: -15,
                    left: 0
                }}>
                    <LinearGradient colors={['#85d5e5', '#79a3d9', '#778dd5']} style={styles.circle}></LinearGradient>
                </Animated.View>
            </View>
        );
    }
}

class DnaLoading extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <DnaBall delay={0} />
                <DnaBall delay={1} />
                <DnaBall delay={2} />
                <DnaBall delay={3} />
                <DnaBall delay={4} />
                <DnaBall delay={5} /> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        height: 30,
        width: 30,
        marginHorizontal: 10,
        zIndex: 1
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DnaLoading;
