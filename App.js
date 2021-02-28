import React from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
} from 'react-native';
import DnaLoading from './DnaLoading';

class App extends React.Component {
	render() {
		return (
			<>
				<StatusBar barStyle="dark-content" />
				<SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
					<DnaLoading />
				</SafeAreaView>
			</>
		);
	}
}

const styles = StyleSheet.create({

});

export default App;
