const customerData = [
  { id: 4084, name: "Scott", phoneNumber: "+14083142771", recruiter: "alice" },
  { id: 4093, name: "Leslie", phoneNumber: "+16176052240", recruiter: "alice" },
  { id: 4099, name: "Neha",  phoneNumber: "+19258886464", recruiter: "alice" },
  { id: 5010, name: "Aimee", phoneNumber: "+16508629043", recruiter: "alice" }
 

];

const recruiters = [
  {name: "alice", vcf: "https://malachite-insect-1116.twil.io/assets/alice.vcf", projectedAddress: "+17812538123" },
  {name: "bob",   vcf: "https://malachite-insect-1116.twil.io/assets/bob.vcf",   projectedAddress: "+18039023799" }
]

const serverUrl = "http://localhost:3000";

const getCustomers = () => {
  return customerData;
};

module.exports = {
  customerData,
  recruiters,
  serverUrl
}