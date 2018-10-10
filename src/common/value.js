import { ngAttrPrefixes } from './ngAttributes.js';
import { allowAutoBootstrap } from './ssx.js';

export ngAttrPrefixes;
export const isAutoBootstrapAllowed = isAllowAutoBootstrap(window.document || document);
