require 'rails_helper'

RSpec.describe Team, type: :model do
 describe "validations" do
   let(:user) {FactoryBot.create(:user)}
   let!(:team) {FactoryBot.create(:team, manager_id: user.id)}
   let(:team1) {FactoryBot.build(:team, name: "", manager_id: user.id)}
   let(:team2) {FactoryBot.build(:team, city: "", manager_id: user.id)}
   let(:team3) {FactoryBot.build(:team, state: "", manager_id: user.id)}
   let(:team4) {FactoryBot.build(:team, zipcode: "", manager_id: user.id)}
   let(:team5) {FactoryBot.build(:team, description: "", manager_id: user.id)}

   it "is valid with all fields required filled in" do
     expect(team).to be_valid
   end
   it "is invalid if name not specified" do
     expect(team1).to_not be_valid
   end
   it "is invalid with a city not specified" do
     expect(team2).to_not be_valid
   end
   it "is invalid with a state not specified" do
     expect(team3).to_not be_valid
   end
   it "is valid with a zipcode not specified" do
     expect(team4).to be_valid
   end
   it "is invalid with a description not specified" do
     expect(team5).to_not be_valid
   end

  end
 end
