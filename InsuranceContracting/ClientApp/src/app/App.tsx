import { Route, Switch } from 'react-router-dom';
import  Layout  from './components/Layout';
import HomeContainer from './containers/HomeContainer';
import ContractorContainer from './containers/ContractorContainer';
import ContractingContainer from './containers/ContractingContainer';
import ContractingChainContainer from './containers/ContractingChainContainer';

function App(): JSX.Element {
    return (
      <Layout>
        <Switch>
          <Route component={HomeContainer} exact path='/' />
          <Route component={ContractorContainer} exact path='/contractor' />
          <Route component={ContractingContainer} exact path='/contracting' />
          <Route component={ContractingChainContainer} exact path='/contractingChain' />
        </Switch>
      </Layout>
    );
}

export default App;

