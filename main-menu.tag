import reactLogo from './react-components/react-logo.png'
import riotLogo from './riot-components/riot240x.png'
import riot from 'riot'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactReduxtris from './react-components/react-reduxtris.jsx'
import { Provider } from 'react-redux'

<main-menu>
    Choose your rendering engine.
    <img alt="riotjs" ref="riot" onclick={ startRiot }>
    <img alt="reactjs" ref="react" onclick={ startReact }>

    <script>
        this.on('mount', () => {
            this.refs.react.src =`##srcServer##${reactLogo}`
            this.refs.riot.src =`##srcServer##${riotLogo}`
        })

        clearStaging() {
            document.querySelector('main').innerHTML = ''
        }

        startRiot() {
            this.clearStaging()
			document.querySelector('main').appendChild(document.createElement('riot-reduxtris'))
			riot.mount('riot-reduxtris')
        }

        startReact() {
            this.clearStaging()
            let wrappedReactApp = React.createElement(Provider, {store: window.Store}, React.createElement(ReactReduxtris));
            ReactDOM.render(wrappedReactApp, document.querySelector('main'));
        }
    </script>

    <style>
        :scope {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
            padding: .5em;
		}
		
		img {
			height: 45px;
			cursor: pointer;
            border-radius: 3px;
		}
    </style>
</main-menu>