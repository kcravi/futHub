class Api::V1::MeetupsController < ApiController
   before_action :authenticate_user!, except: [:index, :show]

  def search
    # topic = params[:search_string]
    topic = {
             state: params[:state],
             city: params[:city],
             zipcode: params[:zipcode]
            }
    meetup_parser = MeetupParser.new
    meetup_parser.search(topic)
    render json: {
      teams: meetup_parser.meetups
    }
  end
end
