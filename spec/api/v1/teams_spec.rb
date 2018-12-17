require 'rails_helper'

RSpec.describe Api::V1::TeamsController, type: :controller do

  describe "GET#index" do
    let!(:user) { FactoryBot.create(:user)}
    let!(:team) { FactoryBot.create(:team, manager_id: user.id)}
    let!(:team_1) { Team.create(name: "Man United", city: "Cambridge", state: "MA", zipcode: "02140", description: "Red Devils", manager_id: user.id)}

    it 'should return a list of all the teams' do
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"

      expect(returned_json.length).to eq 2
      expect(returned_json["teams"].length).to eq 2

      expect(returned_json["teams"][0]["name"]).to eq team.name
      expect(returned_json["teams"][0]["city"]).to eq team.city

      expect(returned_json["teams"][1]["city"]).to eq team_1.city
      expect(returned_json["teams"][1]["zipcode"]).to eq team_1.zipcode
      expect(returned_json["teams"][1]["manager_id"]).to eq user.id
    end
  end
end
