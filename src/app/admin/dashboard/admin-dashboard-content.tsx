"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Users,
  UserPlus,
  FileText,
  Trophy,
  ArrowRight,
  Clock,
  Eye,
  ExternalLink,
  GraduationCap,
} from "lucide-react";

interface RecentApplicant {
  id: string;
  name: string;
  email: string;
  location: string;
  role: string;
  skills: string[];
  experience: string;
  motivation: string;
  linkedinUrl: string;
  resumeUrl: string | null;
  portfolioUrl: string | null;
  status: string;
  appliedAt: string;
}

interface RecentMentor {
  id: string;
  name: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  resumeUrl: string;
  portfolioUrl: string | null;
  whatBuilt: string;
  whatFailed: string;
  whatShipped: string;
  whyMentor: string;
  weeklyAvailability: string;
  status: string;
  appliedAt: string;
}

interface Props {
  stats: {
    teamCount: number;
    memberCount: number;
    applicantCount: number;
    pendingApplicants: number;
    mentorCount: number;
    pendingMentors: number;
  };
  recentApplicants: RecentApplicant[];
  recentMentors: RecentMentor[];
  topTeams: {
    id: string;
    slug: string;
    name: string;
    productName: string;
    totalPoints: number;
    currentWeek: number;
    memberCount: number;
    status: string;
  }[];
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  waitlisted: "bg-blue-100 text-blue-800",
};

export function AdminDashboardContent({ stats, recentApplicants, recentMentors, topTeams }: Props) {
  const [selectedApplicant, setSelectedApplicant] = useState<RecentApplicant | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<RecentMentor | null>(null);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of the Z1 Forge
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Teams</p>
                <p className="text-2xl font-bold">{stats.teamCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100">
                <UserPlus className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Members</p>
                <p className="text-2xl font-bold">{stats.memberCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                <FileText className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Applications</p>
                <p className="text-2xl font-bold">{stats.applicantCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold">{stats.pendingApplicants}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100">
                <GraduationCap className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mentors</p>
                <p className="text-2xl font-bold">{stats.mentorCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Mentors</p>
                <p className="text-2xl font-bold">{stats.pendingMentors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Applications</CardTitle>
                <CardDescription>Latest applicants to the Forge</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/applications">
                  View All <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentApplicants.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{app.name}</p>
                    <p className="text-xs text-muted-foreground">{app.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs capitalize">
                      {app.role}
                    </Badge>
                    <Badge
                      variant={app.status === "pending" ? "secondary" : "default"}
                      className="text-xs capitalize"
                    >
                      {app.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-foreground"
                      onClick={() => setSelectedApplicant(app)}
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {recentApplicants.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No applications yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Teams */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Top Teams</CardTitle>
                <CardDescription>Ranked by total points</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/teams">
                  View All <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topTeams.map((team, i) => (
                <div
                  key={team.id}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{team.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {team.productName} — Wk {team.currentWeek}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Trophy className="h-3.5 w-3.5 text-yellow-500" />
                      <span className="text-sm font-bold">{team.totalPoints}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {team.memberCount} members
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Mentor Applications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Mentors</CardTitle>
                <CardDescription>Latest mentor applications</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{mentor.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{mentor.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[mentor.status] || ""}`}
                    >
                      {mentor.status}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-foreground"
                      onClick={() => setSelectedMentor(mentor)}
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {recentMentors.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No mentor applications yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applicant Detail Dialog */}
      <Dialog
        open={!!selectedApplicant}
        onOpenChange={(open) => !open && setSelectedApplicant(null)}
      >
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          {selectedApplicant && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedApplicant.name}</DialogTitle>
                <DialogDescription>{selectedApplicant.email}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {selectedApplicant.role}
                  </Badge>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[selectedApplicant.status] || ""}`}
                  >
                    {selectedApplicant.status}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Applied</p>
                  <p className="text-sm">
                    {new Date(selectedApplicant.appliedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {selectedApplicant.location && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Location</p>
                    <p className="text-sm">{selectedApplicant.location}</p>
                  </div>
                )}

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedApplicant.skills.map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs max-w-full break-words whitespace-normal">
                        {s}
                      </Badge>
                    ))}
                    {selectedApplicant.skills.length === 0 && (
                      <p className="text-sm text-muted-foreground">None listed</p>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Experience</p>
                  <p className="text-sm whitespace-pre-wrap break-words">{selectedApplicant.experience}</p>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Motivation</p>
                  <p className="text-sm whitespace-pre-wrap break-words">{selectedApplicant.motivation}</p>
                </div>

                {(selectedApplicant.linkedinUrl || selectedApplicant.resumeUrl || selectedApplicant.portfolioUrl) && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Links</p>
                    <div className="flex flex-col gap-1">
                      {selectedApplicant.linkedinUrl && (
                        <a
                          href={selectedApplicant.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline break-all"
                        >
                          LinkedIn <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      )}
                      {selectedApplicant.resumeUrl && (
                        <a
                          href={selectedApplicant.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline break-all"
                        >
                          Resume / CV <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      )}
                      {selectedApplicant.portfolioUrl && (
                        <a
                          href={selectedApplicant.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline break-all"
                        >
                          Portfolio <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Mentor Detail Dialog */}
      <Dialog
        open={!!selectedMentor}
        onOpenChange={(open) => !open && setSelectedMentor(null)}
      >
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          {selectedMentor && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMentor.name}</DialogTitle>
                <DialogDescription>{selectedMentor.email}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Mentor</Badge>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[selectedMentor.status] || ""}`}
                  >
                    {selectedMentor.status}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Applied</p>
                  <p className="text-sm">
                    {new Date(selectedMentor.appliedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Phone</p>
                  <p className="text-sm">{selectedMentor.phone}</p>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Weekly Availability</p>
                  <p className="text-sm">{selectedMentor.weeklyAvailability}</p>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">What have you built?</p>
                  <p className="text-sm whitespace-pre-wrap break-words">{selectedMentor.whatBuilt}</p>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">What have you failed at?</p>
                  <p className="text-sm whitespace-pre-wrap break-words">{selectedMentor.whatFailed}</p>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">What have you shipped?</p>
                  <p className="text-sm whitespace-pre-wrap break-words">{selectedMentor.whatShipped}</p>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Why mentor?</p>
                  <p className="text-sm whitespace-pre-wrap break-words">{selectedMentor.whyMentor}</p>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Links</p>
                  <div className="flex flex-col gap-1">
                    <a
                      href={selectedMentor.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline break-all"
                    >
                      LinkedIn <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                    <a
                      href={selectedMentor.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline break-all"
                    >
                      Resume / CV <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                    {selectedMentor.portfolioUrl && (
                      <a
                        href={selectedMentor.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline break-all"
                      >
                        Portfolio <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
