### A Quick Base64 Encode/Decode Demo ###

# require Ruby's base64 library
require 'base64'

# Create a message  (Zach Synder's Justice League cast)
heroes = %w[Batman Superman Wonder\ Woman Flash Aquaman Cyborg]
message = "Justice League: #{heroes.join(', ')}."

# Base74 encoding of the message 
encoded_message = Base64.encode64(message)

puts "Encoded: "
puts encoded_message

# Time to decode the base64 string
decoded_message = Base64.decode64(encoded_message)

puts "Decoded: "
puts decoded_message