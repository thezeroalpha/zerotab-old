require 'json'

file = File.read("js/config.json")
hash = JSON.parse(file)

total = hash["content"].inject(0) do |sum,(category,_)|
    sum+= hash["content"][category]["links"].inject(0) { |innersum,_| innersum += 1; innersum; }
    sum
end

hash["length"] = total

puts "Links found: #{total}"

File.open("js/config.json", "w") do |f|
    f.puts "#{hash.to_json}"
end
puts "File updated."
