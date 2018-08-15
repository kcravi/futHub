require 'httparty'
require 'pry'

class MeetupParser
  attr_reader :team

  def initialize
    @team = []
  end

  def search(query)
    # response = HTTParty.get("https://api.meetup.com/2/groups?key=#{ENV["MEETUP_KEY"]}&topic=soccer")
    # binding.pry
    response = HTTParty.get("https://api.meetup.com/2/groups?key=#{ENV["MEETUP_KEY"]}&topic=#{query}")
    count = 0;
    response["results"].each do |meetup|
      # binding.pry
      @team << Team.create(
        id: count+=1,
        name: meetup["name"],
        city: meetup["city"],
        state: meetup["state"],
        description: meetup["description"]
        # photo: meetup["group_photo"]["photo_id"]
      )
    end
  end
end
