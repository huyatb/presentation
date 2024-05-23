FROM jekyll/jekyll

# Set the working directory
WORKDIR /app
RUN gem install bundler webrick
