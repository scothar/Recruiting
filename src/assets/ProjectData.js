const customerData = [
  { id: 4084, name: "Scott", phoneNumber: "+14083142771", recruiter: "alice" },
  { id: 4093, name: "Ashok", phoneNumber: "+16509992000", recruiter: "alice" },
  { id: 4099, name: "Neha",  phoneNumber: "+19258886464", recruiter: "alice" },
  { id: 5010, name: "Aimee", phoneNumber: "+16508629043", recruiter: "alice" },
  { id: 5020, name: "Tom",   phoneNumber: "+14083142771", recruiter: "alice" },
  { id: 6010, name: "Katie", phoneNumber: "+16509992000", recruiter: "alice" },
  { id: 7020, name: "Sarah", phoneNumber: "+19258886464", recruiter: "alice" },
  { id: 8000, name: "Marge", phoneNumber: "+16508629043", recruiter: "alice" }

];

const recruiters = [
  {name: "alice", vcf: "https://scotts-lab-1976.twil.io/alice.vcf", projectedAddress: "+14085836571" },
  {name: "bob",   vcf: "https://scotts-lab-1976.twil.io/bob.vcf",   projectedAddress: "+14087223527" }
]

const serverUrl = "http://10.0.0.3:3000";

const getCustomers = () => {
  return customerData;
};

module.exports = {
  customerData,
  recruiters,
  serverUrl
}