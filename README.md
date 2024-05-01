# Personal Resumee Page
Based on the great Jekyll template you can find at https://github.com/sproogen/modern-resume-theme. 


## Local development
### Ruby and jekyll setup
To start the web server of the static content you need Ruby installed on your machine.

For linux or wsl:
```
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-add-repository ppa:brightbox/ruby-ng
sudo apt-get install ruby-full build-essential dh-autoreconf
```

Check if Ruby is correctly installed with:
```
ruby -v
```

Update gems afterwards:
```
gem update
```

And then install jekyll and bundler gems:
```
gem install jekyll bundler
```

### Start server locally
Use:
```
bundle install
```

Then: 
```
bundle exec jekyll serve --livereload
```