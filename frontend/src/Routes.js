import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';

export default function Routes() {
  return (
    // lembrete: o switch serve para que apenas uma rota seja chamada por vez
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/new" exact component={NewContact} />
      <Route path="/edit/:id" exact component={EditContact} />
    </Switch>
  );
}
