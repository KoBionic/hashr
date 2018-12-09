import React from 'react';
import '../themes/Variables.css';
import * as styles from './App.css';
import Footer from './footer/Footer';
import Main from './main/Main';
import Messager from './widgets/messager/Messager';

function preventDragEvent(event: React.DragEvent<any>): boolean {
    event.preventDefault();
    return false;
}

const App = () => (
    <div
        className={styles.app}
        onDragEnd={preventDragEvent}
        onDragLeave={preventDragEvent}
        onDragOver={preventDragEvent}
        onDragStart={preventDragEvent}
        onDrop={preventDragEvent}
    >
        <Main />
        <Footer />
        <Messager />
    </div>
);

export default App;
