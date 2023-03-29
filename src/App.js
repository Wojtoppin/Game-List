import Window from './GameComponents/Window.jsx';
import Settings from './Settings/Settings.jsx'
import Banner from './Banner/Banner.jsx'
import MenageAuthor from './MenageBoxes/MenageAuthor.jsx'
import MenageGame from './MenageBoxes/MenageGame.jsx';
import MenageCategory from './MenageBoxes/MenageCategory.jsx';
import MenagePlatform from './MenageBoxes/MenagePlatform.jsx';
import Filter from './Filter/Filter.jsx';
import './App.css';
import React from 'react';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      game:[],
      author:[],
      category:[],
      platform:[],
      settingsMargin: 0,
      windowSize:'large',
      isWindowOpened: true,
      isSettingsOpened: false,
      isMenageGameOpened: false,
      isMenageAuthorOpened: false,
      isMenageCategoryOpened: false,
      isMenagePlatformOpened: false,
      isResetPreferencesOpened: false,
      gameURL: 'http://localhost:8080/game',
    };
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.toggleCheck = this.toggleCheck.bind(this);
    this.onGameToggle = this.onGameToggle.bind(this);
    this.onAuthorToggle = this.onAuthorToggle.bind(this);
    this.onCategoryToggle = this.onCategoryToggle.bind(this);
    this.onPlatformToggle = this.onPlatformToggle.bind(this);
    this.onChangeURL = this.onChangeURL.bind(this);
    this.fetchValues = this.fetchValues.bind(this);
  }
  fetchValues(){
    fetch(this.state.gameURL)
    .then(response => response.json())
    .then(data =>this.setState({game:data}));
    
    fetch('http://localhost:8080/author')
    .then(response => response.json())
    .then(data =>this.setState({author:data}));

    fetch('http://localhost:8080/category')
    .then(response => response.json())
    .then(data =>this.setState({category:data}));

    fetch('http://localhost:8080/platform')
    .then(response => response.json())
    .then(data =>this.setState({platform:data}));
    this.setState({isResetPreferencesOpened:false})
  }

  componentDidMount(){
    this.fetchValues();
  }

  

  handleSizeChange(){
    this.setState(prevState => ({
        windowSize: prevState.windowSize === 'large' ? 'small': 'large',
        isSettingsOpened: prevState.isSettingsOpened === true? false : true,
        settingsMargin: prevState.settingsMargin === 0 ? 20 : 0,
    }));
}


  toggleCheck(v1,v2,v3){
    if(v1||v2||v3){
      this.setState({
        isMenageAuthorOpened: false,
        isMenageCategoryOpened: false,
        isMenageGameOpened: false,
        isMenagePlatformOpened: false,
      })
      return true;
    }else{
      return false;
    }
    
      
  }

  onAuthorToggle(){
    if(this.toggleCheck(this.state.isMenageCategoryOpened,this.state.isMenageGameOpened, this.state.isMenagePlatformOpened)){
      this.setState({ 
        isMenageAuthorOpened: !this.state.isMenageAuthorOpened
      });
    }else{
      this.setState({ 
        isMenageAuthorOpened: !this.state.isMenageAuthorOpened,
        isWindowOpened: !this.state.isWindowOpened,
      });
    }
    
    
  }

  onGameToggle(){
    if(this.toggleCheck(this.state.isMenageAuthorOpened, this.state.isMenageCategoryOpened, this.state.isMenagePlatformOpened)){
      this.setState({ 
        isMenageGameOpened: !this.state.isMenageGameOpened,
      });
    }else{
      this.setState({ 
        isMenageGameOpened: !this.state.isMenageGameOpened,
        isWindowOpened: !this.state.isWindowOpened,
      });
    }
  }
  
  onCategoryToggle(){
    if(this.toggleCheck(this.state.isMenageAuthorOpened,this.state.isMenageGameOpened,this.state.isMenagePlatformOpened)){
      this.setState({ 
        isMenageCategoryOpened: !this.state.isMenageCategoryOpened,
      });
    }else{
      this.setState({ 
        isMenageCategoryOpened: !this.state.isMenageCategoryOpened,
        isWindowOpened: !this.state.isWindowOpened,
      });
    }
  }

  onPlatformToggle(){
    if(this.toggleCheck(this.state.isMenageAuthorOpened, this.state.isMenageCategoryOpened, this.state.isMenageGameOpened)){
      this.setState({ 
        isMenagePlatformOpened: !this.state.isMenagePlatformOpened,
      });
    }else{
      this.setState({ 
        isMenagePlatformOpened: !this.state.isMenagePlatformOpened,
        isWindowOpened: !this.state.isWindowOpened,
      });
    }
  }

  onChangeURL(newURL){
    if(newURL !== "http://localhost:8080/game?"){
      this.setState({isResetPreferencesOpened: true})
    }
    fetch(newURL)
    .then(response => response.json())
    .then(data =>this.setState({game:data}));
    
  }
  

  render(){
    return (
      <div>
        <Banner/>
        {this.state.isWindowOpened && <Filter state={this.state} onChangeURL={this.onChangeURL}/>}
        <img src="/settings.png" style={{marginLeft: `${this.state.settingsMargin}%`}} alt="open settings" className="openSettings" onClick={this.handleSizeChange}/>
        {this.state.isSettingsOpened && <Settings onAuthorToggle={this.onAuthorToggle} onGameToggle={this.onGameToggle} onCategoryToggle={this.onCategoryToggle} onPlatformToggle={this.onPlatformToggle}/>}
        {this.state.isMenageGameOpened && <MenageGame fetchValues={this.fetchValues} state={this.state}/>}
        {this.state.isMenageAuthorOpened && <MenageAuthor fetchValues={this.fetchValues} author={this.state.author}/>}
        {this.state.isMenageCategoryOpened && <MenageCategory fetchValues={this.fetchValues} category={this.state.category}/>}
        {this.state.isMenagePlatformOpened && <MenagePlatform fetchValues={this.fetchValues} platform={this.state.platform}/>}
        {this.state.isWindowOpened && <Window state={this.state} windowSize={this.state.windowSize} onChangeURL={this.onChangeURL}/>}
        {this.state.isWindowOpened && this.state.isResetPreferencesOpened &&<img className="reset" src="/reset.png" alt='reset values' onClick={this.fetchValues} style={{marginLeft: `${this.state.settingsMargin}%`}}/>}
      </div>
    );
  };
  
}

export default App;
