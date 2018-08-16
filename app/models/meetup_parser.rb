require 'httparty'
require 'pry'

class MeetupParser
  attr_reader :meetups

  def initialize
    @meetups = []
  end

  def search(query)
    # response = HTTParty.get("https://api.meetup.com/2/groups?key=#{ENV["MEETUP_KEY"]}&topic=soccer")
    response = HTTParty.get("https://api.meetup.com/2/groups?key=#{ENV["MEETUP_KEY"]}&topic=soccer&zip=#{query}")
    response["results"].each do |meetup|
      new_team = Team.new(
        name: meetup["name"],
        city: meetup["city"],
        state: meetup["state"],
        description: meetup["description"]
      #   photo: meetup["group_photo"]["highres_link"]
      )
      @meetups << new_team
    end
  end
end
