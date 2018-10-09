# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user1 = FactoryBot.create(
  :user)
# user1 = FactoryBot.create(
#   :user,
#   admin: true)
user2 = FactoryBot.create(
  :user)
user3 = FactoryBot.create(
  :user)

user4 = FactoryBot.create(
  :user)
user5 = FactoryBot.create(
  :user)
user6 = FactoryBot.create(
  :user)

team1 = FactoryBot.create(
  :team,
  phone_number: "(617)617-6176",
  website: "www.tibetanfootballclub.com",
  manager_id: user1.id
)
# team1 = Team.find_or_create_by(
#   name: "BNFC",
#   city:"Somerville",
#   state:"MA",
#   zipcode:"02145",
#   description:"Boston based Nepalese Football Club",
#   phone_number: "(617)817-2590",
#   website: "www.bnfc.com",
#   manager_id: user1.id)
team2 = Team.find_or_create_by(
  name: "Tibetan Football Club",
  city:"Somerville",
  state:"MA",
  zipcode:"02145",
  description:"Boston based Tibetan Football Club",
  phone_number: "(617)617-6176",
  website: "www.tibetanfootballclub.com",
  manager_id: user2.id)
team3 = Team.find_or_create_by(
  name: "Medford Pickup Soccer",
  city:"Medford",
  state:"MA",
  zipcode:"02149",
  description:"A pickup group for adults of all ages, skill levels, and backgrounds looking to have fun playing friendly, small-sided, low impact soccer.",
  phone_number: "(617)617-6666",
  website: "www.medfordfc.com",
  manager_id: user3.id)

  team1.users << [user1, user4]
  team2.users << [user2, user5]
  team3.users << [user3, user6]

tournament1 = Tournament.find_or_create_by(
  website: "https://sajha.com/sajha/html/index.cfm?eventid=3023",
  url: "https://i.ytimg.com/vi/UN0qxDqxYOo/maxresdefault.jpg",
  types: "Men's Adult 7-a-side",
  name: "BNFC Annual Cup",
  organizer: "BNFC",
  description: "An annual adult-soccer-tournament organized by BNFC to help underprivilged kids.",
  street: "99 Sherman st",
  city: "Cambridge",
  state: "MA",
  zipcode: "02138",
  fee: "$350",
  awards:"$1000 cash prize for 1st place and trophy for 1st and 2nd places.",
  status: "closed")
tournament2 = Tournament.find_or_create_by(
  website: "https://sajha.com/sajha/html/index.cfm?eventid=2936",
  url: "https://i.imgur.com/Ti7YIq5.jpg",
  types: "Men's Adult 6-a-side",
  name: "Khasi Cup",
  organizer: "Jatra Nepal",
  description: "In celebration of the auspicious festival of Dashain and with hopes of bringing a part of the celebration from Nepal to Boston, we at Jatra Nepal bring to you the Second Annual Khasi Cup 2017.",
  street: "101 School St",
  city: "Revere",
  state: "MA",
  zipcode: "02151",
  fee: "$ 350",
  status: "closed",
  awards: "$1000 cash prize for 1st place and trophy for 1st and 2nd places.")
tournament3 = Tournament.find_or_create_by(
  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgkYaF24UVXQxxcKClikRpXv28Bt5g9UdmEp4IncX4Egbx_f97xQ",
  types: "Coed 8-a-side",
  name: "Tuesday Quincy Coed 8v8 Soccer",
  organizer: "BSSC",
  description: "This South Shore league plays on synthetic grass.  A full size soccer field is divided into 2 smaller fields (195' x 120') with reduced size goals (18' x 6'). Enter your own team or sign up as an individual player.  All levels welcome! Shin guards are required; cleats or turf shoes are recommended.",
  street: "850 Hancock Street ",
  city: "Quincy",
  state: "MA",
  zipcode: "02170",
  fee: "$775",
  awards:"$1500 cash prize for 1st place, Tshirts and gift cards",
  status: "closed",
  website: "https://bssc.com/event/tuesday-quincy-coed-8v8-soccer06192018");
