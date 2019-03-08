require 'httparty'

class MeetupParser
  attr_reader :meetups, :error

  def initialize
    @meetups = []
    @error = ''
  end

  def remove_html_tags(data)
    if data
      re = /<("[^"]*"|'[^']*'|[^'">])*>/
      tagless_data = data.gsub!(re, '')
      # tagless_data.tr("\n", '').strip
    end
  end

  # response = HTTParty.get("https://api.meetup.com/2/groups?key=#{ENV["MEETUP_KEY"]}&topic=soccer&zip=#{query}")
  def search(query)
    key="#{ENV["MEETUP_KEY"]}&topic=soccer&country=US&state=#{query[:state]}&city=#{query[:city]}&zip=#{query[:zipcode]}"
    response = HTTParty.get("https://api.meetup.com/2/groups?key=#{key}")

    if (response["problem"])
        @error = response["problem"]
    else
      response["results"].each do |meetup|
        description = remove_html_tags(meetup["description"])

        url = ''
        if meetup["group_photo"].nil?
          url = "https://www.themuseatdreyfoos.com/wp-content/uploads/2016/07/CASLs15CoachesMeeting.jpg"
        else
          url = meetup["group_photo"]["photo_link"]
        end

        # new_team = Team.find_or_create_by!(
        new_team = Team.new(
          name: meetup["name"],
          city: meetup["city"],
          state: meetup["state"],
          description: description,
          url: url,
          website: meetup["link"],
          created_at: meetup["created"]
        )
        @meetups << new_team
      end
    end
  end
end
