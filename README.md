# DEVELOPMENT TOOLS

* Node.js 12.8.1
* Command line
* WebStorm

# HOW TO PREPARE AND RUN

* Use command line and switch to a project directory root
* Use following command to install dependencies:

`npm install`

* Use following command to run application in production mode:

`npm run prod`

* Use following command to run application in development mode:

`npm run dev`

# CHANGES TO THE APPLICATION

> You have a new requirement to implement for your application: its logic should stay exactly the same but it will need to have a different user interface (e.g. if you wrote a web app, a different UI may be a REPL).

This project follows the object-oriented approach, where certain aspects of the applications encapsulated into independent entities. An example of these aspects are:
* Input - there is an **Input** interface that abstracts the idea of the input. The **CommandLineInput** implements an input from the command line. There could be a separate implementation for different input modes. The **queryUser** method of the interface accepts callback, providing an option for delayed response.
* Output - there is an **Output** interface that abstracts the idea of the output. The **CommandLineOutput** implements an output to the console. As you can see, separate channels for input and output are supported.
* Host - the **Host** is essentially the "glue" for the system. I created **CommandLineHost** as a default implementation, but a different host implementation could be provided in case of user interface change, e.g. this could be a REST API host for the web interface.
* Logic - the **Logic** interface completely abstracts logic from host. This is the core of the application (i.e. its model) and may (and most likely will) stay unchanged in case of user interface change.

> You now need to make your application “production ready”, and deploy it so that it can be used by customers.

Presuming it has to be deployed in its current shape (command-line utility) I installed PKG - an utility to build executables for various platforms.

Execute the following command inthe project root:

`pkg .`

The utility will generate executables for three different platforms by default: Windows, Linux and MacOS. Although the executable size is enourmous, the generated executable will work at the end-user machine with no issues.

> What did you think about this coding test - is there anything you’d suggest in order to improve it?

Regardless of the outcome of this test I had a lot of fun coding it. The end result is directly related to the quality/time balance: e.g. I could add some unit tests and follow TDD practices, but that would at least double the time required to do the work, which of course would pay back for the larger scale projects. I also haven't put any comments as I find them excessive for such a small and simple application: the code should be self-describing: some "harder" bits like binary search function should indicate the function implements binary search algorthm via proper naming. The algorithm itself is quite well-known, so I omitted any comments in that area.