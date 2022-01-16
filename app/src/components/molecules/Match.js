import React from 'react';

import {
Image,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';

const deviceHeight = Dimensions.get('window').height
export class Match extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    show = () => {
        this.setState({show:true})
    }

    close = () => {
        this.setState({show: false})
    }

    renderOutsideTouchable(onTouch) {
        const view = <View style={{flex: 1, width: '100%'}}/>
        if (!onTouch) return view

        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{flex:1, width: '100%'}}>
            {view}
            </TouchableWithoutFeedback>
            )
    }

    render() {
        let {show} = this.state
        const {onTouchOutside, matchDegree} = this.props
        
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}
            >

            <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'flex-end'}}>
                
                {this.renderOutsideTouchable(onTouchOutside)}
                <View style={{backgroundColor: 'white', 
                            width: '100%',
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                            paddingHorizontal: 10,
                            maxHeight: deviceHeight * 0.3,
                            bottom: 300
                            }}>

                <View style={{height: '50%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>

                    <Image style={{height: 200, width: 300}} source={require('../../../assets/match_splash.png')}/> 
                    <Text style={{marginTop: 20}}>You have a {matchDegree}-way match</Text>
                    
                </View>

                </View>
                
            </View>
            
            </Modal>

              
            
            )
    }



}

export default Match
