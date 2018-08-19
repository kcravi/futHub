class Api::V1::MeetupsController < ApiController
   before_action :authenticate_user!, except: [:index, :show]

  def search
    topic = params[:search_string]
    meetup_parser = MeetupParser.new
    meetup_parser.search(topic)
    render json: {team: meetup_parser.meetups}
  end

end
