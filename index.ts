import {DefaultLogicFactory} from "./app/logic";
import {CommandLineHostFactory, Host} from "./app/host";

const host: Host = CommandLineHostFactory(DefaultLogicFactory);

host.run();