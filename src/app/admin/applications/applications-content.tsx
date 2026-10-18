"use client";

import { Fragment, useState } from "react";
import {
  Card,
  CardContent,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X, Clock, ChevronDown, ChevronUp, Eye, ExternalLink, Trash2 } from "lucide-react";

interface Applicant {
  id: string;
  name: string;
  email: string;
  location: string;
  preferredRole: string;
  skills: string[];
  experience: string;
  motivation: string;
  linkedinUrl: string;
  resumeUrl: string | null;
  portfolioUrl: string | null;
  status: string;
  appliedAt: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  waitlisted: "bg-blue-100 text-blue-800",
};

export function ApplicationsContent({ applicants: initial }: { applicants: Applicant[] }) {
  const [applicants, setApplicants] = useState(initial);
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Applicant | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered =
    filter === "all"
      ? applicants
      : applicants.filter((a) => a.status === filter);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    const res = await fetch("/api/admin/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setApplicants((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    }
    setUpdating(null);
  }

  async function deleteApplicant(id: string) {
    setDeleting(true);
    const res = await fetch(`/api/admin/applications?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setApplicants((prev) => prev.filter((a) => a.id !== id));
    }
    setDeleting(false);
    setDeleteTarget(null);
  }

  const counts = {
    all: applicants.length,
    pending: applicants.filter((a) => a.status === "pending").length,
    accepted: applicants.filter((a) => a.status === "accepted").length,
    rejected: applicants.filter((a) => a.status === "rejected").length,
    waitlisted: applicants.filter((a) => a.status === "waitlisted").length,
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
        <p className="text-muted-foreground">
          Review and manage Forge applications
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(["all", "pending", "accepted", "rejected", "waitlisted"] as const).map(
          (status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
              <Badge variant="secondary" className="ml-1.5">
                {counts[status]}
              </Badge>
            </Button>
          )
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((app) => (
                <Fragment key={app.id}>
                  <TableRow
                    className="cursor-pointer"
                    onClick={() =>
                      setExpandedId(expandedId === app.id ? null : app.id)
                    }
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {expandedId === app.id ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="font-medium">{app.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {app.email}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize text-xs">
                        {app.preferredRole}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                          statusColors[app.status] || ""
                        }`}
                      >
                        {app.status}
                      </span>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground text-sm sm:table-cell">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-foreground"
                          onClick={() => setSelectedApplicant(app)}
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => updateStatus(app.id, "accepted")}
                          disabled={updating === app.id || app.status === "accepted"}
                          title="Accept"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => updateStatus(app.id, "rejected")}
                          disabled={updating === app.id || app.status === "rejected"}
                          title="Reject"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => updateStatus(app.id, "waitlisted")}
                          disabled={updating === app.id || app.status === "waitlisted"}
                          title="Waitlist"
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setDeleteTarget(app)}
                          disabled={updating === app.id}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedId === app.id && (
                    <TableRow key={`${app.id}-detail`}>
                      <TableCell colSpan={6}>
                        <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                          {app.location && (
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-1">Location</p>
                              <p className="text-sm">{app.location}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Skills</p>
                            <div className="flex flex-wrap gap-1">
                              {app.skills.map((s) => (
                                <Badge key={s} variant="secondary" className="text-xs">
                                  {s}
                                </Badge>
                              ))}
                              {app.skills.length === 0 && (
                                <p className="text-sm text-muted-foreground">None listed</p>
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Experience</p>
                            <p className="text-sm whitespace-pre-wrap break-words">{app.experience}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Motivation</p>
                            <p className="text-sm whitespace-pre-wrap break-words">{app.motivation}</p>
                          </div>
                          {(app.linkedinUrl || app.resumeUrl || app.portfolioUrl) && (
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-1">Links</p>
                              <div className="flex flex-wrap gap-3">
                                {app.linkedinUrl && (
                                  <a
                                    href={app.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                                  >
                                    LinkedIn <ExternalLink className="h-3 w-3" />
                                  </a>
                                )}
                                {app.resumeUrl && (
                                  <a
                                    href={app.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                                  >
                                    Resume / CV <ExternalLink className="h-3 w-3" />
                                  </a>
                                )}
                                {app.portfolioUrl && (
                                  <a
                                    href={app.portfolioUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                                  >
                                    Portfolio <ExternalLink className="h-3 w-3" />
                                  </a>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No applications found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
                    {selectedApplicant.preferredRole}
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent className="sm:max-w-md">
          {deleteTarget && (
            <>
              <DialogHeader>
                <DialogTitle>Delete Applicant</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete <strong>{deleteTarget.name}</strong>&apos;s application? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteApplicant(deleteTarget.id)}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
