"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logic_1 = require("./app/logic");
var host_1 = require("./app/host");
var host = host_1.CommandLineHostFactory(logic_1.DefaultLogicFactory);
host.run();
