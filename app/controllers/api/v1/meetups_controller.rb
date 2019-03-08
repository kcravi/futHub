class Api::V1::MeetupsController < ApiController
   before_action :authenticate_user!, except: [:index, :show, :search]

  def search
    # topic = params[:search_string]
    topic = {
             state: params[:state],
             city: params[:city],
             zipcode: params[:zipcode]
            }
    meetup_parser = MeetupParser.new
    meetup_parser.search(topic)

    if meetup_parser.error == ''
      render json: { teams: meetup_parser.meetups }
    else
      render json: { error: meetup_parser.error }
    end
  end
end
