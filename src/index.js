import React from 'react';
import './index.css';
import state from "./state";
import reportWebVitals from './reportWebVitals';
import {rerenderEntireTree} from "./render";

rerenderEntireTree(state);
reportWebVitals();
