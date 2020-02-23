# Git Faker

Git Faker is a tool that allows you to create fake Git Contribution history by typing in a custom message!

This tool was created in order to make some cool custom mugs using https://shop.devmugs.com/

This was not created in order to fool people that you code alot, and is not inteded to be used for malicious purposes.

![sample image](sample.png)

### Prerequisites

What things you need to install the software and how to install them

```
node
```

### Using the Tool

The tool allows you to type a custom message, and create a git contribution history that can be used to create cool mugs using https://shop.devmugs.com/

The tool will ask you for your Github Username, Email and Password. NONE of this information is stored, and it is only sent to Github for authentication purposes.

You must have a Git Repository on your Account with the name `gitfaker`

1. Start the tool npm start
2. Accept the warning, if you agree
3. Enter a message of your choice
4. Enter your Github Username / Email / Password
5. Enjoy your new contribution history with your custom message!

Sample

```
? In order for this tool to work you must provide your Github Username, Email and Password. None of this information is stored. It's only used to create the commits. You must have a repository named 'gitfaker'

 You must have a Git Repository created with the name 'gitfaker'

 Please confirm that you have read above, and have the Git Repository created [y/n] y


? Create your message! (max typically 8-11 chars) This is fun
? Github Username :  ericfakertest
? Github Email :  kudrajalip@matra.site
? Github Password :  [hidden]
Successfully created the message, check out your contribution history!
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
