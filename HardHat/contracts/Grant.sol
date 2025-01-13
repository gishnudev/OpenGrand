// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract OpenGrant {
    struct Application {
        string studentName;
        uint256 studentAge;
        string studentQualification;
        uint256 studentPassYear;
        string grade;
        uint256 percentage;
        bool isSubmitted;
        bool isApproved;
        string documentImageURL;
    }

    event ApplicationSubmitted(address indexed applicant, string studentName, uint256 percentage);
    event ApplicationApproved(address indexed applicant, string studentName, uint256 amountTransferred);
    event ScholarshipDetailsDefined(uint256 startTime, uint256 endTime);

    address public admin;
    uint256 public applicationStartTime;
    uint256 public applicationEndTime;

    mapping(address => Application) public applications;
    address[] public applicants;

    uint256 constant MIN_PERCENTAGE = 80;
    uint256 constant PASS_OUT_YEAR = 2024;
    string constant ELIGIBLE_QUALIFICATION_1 = "MSc";
    string constant ELIGIBLE_QUALIFICATION_2 = "MCA";
    uint256 constant APPROVAL_REWARD = 100 wei; // Adjusted reward per application to 100 Wei

    modifier onlyAdmin() {
        require(msg.sender == admin, "Unauthorized: Only admin can perform this action");
        _;
    }

    modifier withinApplicationPeriod() {
        require(block.timestamp >= applicationStartTime, "Application period has not started yet");
        require(block.timestamp <= applicationEndTime, "Application period has ended");
        _;
    }

    constructor(uint256 _applicationStartTime, uint256 _applicationEndTime) payable {
        require(_applicationStartTime < _applicationEndTime, "Start time must be before end time");
        require(msg.value == 10000 wei, "Must send exactly 10,000 Wei to initialize the contract.");

        admin = msg.sender;
        applicationStartTime = _applicationStartTime;
        applicationEndTime = _applicationEndTime;

        emit ScholarshipDetailsDefined(_applicationStartTime, _applicationEndTime);
    }

    function submitApplication(
        string memory _studentName,
        uint256 _studentAge,
        string memory _studentQualification,
        uint256 _studentPassYear,
        string memory _grade,
        uint256 _percentage,
        string memory _documentImageURL
    ) public withinApplicationPeriod {
        require(!applications[msg.sender].isSubmitted, "You have already submitted an application.");
        require(_percentage >= MIN_PERCENTAGE, "Percentage must be 80% or above.");
        require(_studentPassYear == PASS_OUT_YEAR, "Pass-out year must be 2024.");
        require(
            keccak256(bytes(_studentQualification)) == keccak256(bytes(ELIGIBLE_QUALIFICATION_1)) ||
            keccak256(bytes(_studentQualification)) == keccak256(bytes(ELIGIBLE_QUALIFICATION_2)),
            "Qualification must be MSc or MCA."
        );

        applications[msg.sender] = Application({
            studentName: _studentName,
            studentAge: _studentAge,
            studentQualification: _studentQualification,
            studentPassYear: _studentPassYear,
            grade: _grade,
            percentage: _percentage,
            isSubmitted: true,
            isApproved: false,
            documentImageURL: _documentImageURL
        });

        applicants.push(msg.sender);
        emit ApplicationSubmitted(msg.sender, _studentName, _percentage);
    }

    function approveApplication(address applicant) public onlyAdmin {
        require(applications[applicant].isSubmitted, "No application found for this applicant.");
        require(!applications[applicant].isApproved, "Application is already approved.");
        require(address(this).balance >= APPROVAL_REWARD, "Insufficient funds to approve the application.");

        applications[applicant].isApproved = true;

        payable(applicant).transfer(APPROVAL_REWARD);

        emit ApplicationApproved(applicant, applications[applicant].studentName, APPROVAL_REWARD);
    }

    function viewApplication(address applicant) public view returns (Application memory) {
        return applications[applicant];
    }

    function viewAllApplications() public view returns (Application[] memory) {
        Application[] memory allApplications = new Application[](applicants.length);
        for (uint256 i = 0; i < applicants.length; i++) {
            allApplications[i] = applications[applicants[i]];
        }
        return allApplications;
    }
}
